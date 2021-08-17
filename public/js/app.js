//add variable to hold Auth0 client object
let auth0 = null;

//calling auth config values from json file
const fetchAuthConfig = () => fetch("/auth_config.json");

//use info from fetchAuthConfig to download config file and
//initialize auth0 variable
//Also populates in-memory cache w/ access token and user info
const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
  
    auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId
    });
  };

//add handler to window tht will make call to initialize application
window.onload = async () => {
    await configureClient();
    updateUI();
  }

  //enable & disable buttons depending on auth status
  const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();
  
    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;
  };

  //login function
  const login = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: window.location.origin
    });
  };
