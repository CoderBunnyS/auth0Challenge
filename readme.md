    // "start": "node server.js",
    // "dev": "nodemon server.js",
    // "test": "echo \"Error: no test specified\" && exit 1",
    // "dev": "react-scripts start",

    app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});