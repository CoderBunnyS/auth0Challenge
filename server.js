const express = require("express");
const { join } = require("path");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jwtAuthz = require('express-jwt-authz');
const authConfig = require("./auth_config.json");

const app = express();

// Serve static assets from the /public folder
app.use(express.static(join(__dirname, "public")));

//create the JWT validation middleware
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

//create an endpoint thta uses the above middleware to
//protect router from unauthorized requests
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

// Endpoint to serve the configuration file
app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// Serve the index page for all other requests
app.get("/*", (_, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//check scopes
const checkScopes = jwtAuthz([ 'read:orders' ]);

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

// Error handler
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).send({ msg: "Invalid token" });
  }

  next(err, req, res);
});

module.exports = app;

// Listen on port 9000
//app.listen(9000, () => console.log("Application running on port 9000"));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}
app.listen(port);
