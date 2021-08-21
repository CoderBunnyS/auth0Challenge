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
      client_id: config.clientId,
      audience: config.audience
    });
  };

  //create a call API function
  const callApi = async () => {
    try {
  
      // Get the access token from the Auth0 client
      const token = await auth0.getTokenSilently();
  
      // Make the call to the API, setting the token
      // in the Authorization header
      const response = await fetch("/api/external", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Fetch the JSON result
      const responseData = await response.json();
  
      // Display the result in the output element
      const responseElement = document.getElementById("api-call-result");
  
      responseElement.innerText = JSON.stringify(responseData, {}, 2);
  
  } catch (e) {
      // Display errors in the console
      console.error(e);
    }
  };

//add handler to window tht will make call to initialize application
window.onload = async () => {
    await configureClient();
    
    updateUI();

    const isAuthenticated = await auth0.isAuthenticated();

    if (isAuthenticated){

      return;

    }
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")){
      await auth0.handleRedirectCallback();

      updateUI();

      window.history.replaceState({}, document.title, "/");
    }
  };
  
  //enable & disable buttons depending on auth status
  const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();
  
    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;

      // NEW - enable the button to call the API
  document.getElementById("btn-call-api").disabled = !isAuthenticated;
  
    if (isAuthenticated){

      

      document.getElementById("gated-content").classList.remove("hidden");

      document.getElementById("ipt-access-token").innerHTML = await auth0.getTokenSilently();

      document.getElementById("ipt-user-profile").textContent = JSON.stringify(
        await auth0.getUser()

        
      );
    } else {
      document.getElementById("gated-content").classList.add("hidden")
    }
  };

    //login function
    const login = async () => {
      await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
      });
    };

  //show/hide content after auth
  // if (isAuthenticated) {
  //   document.getElementById("gated-content").classList.remove("hidden");

  //   document.getElementById(
  //     "ipt-access-token"
  //   ).innerHTML = await auth0.getTokenSilently();

  //   document.getElementById("ipt-user-profile").textContent = JSON.stringify(
  //     await auth0.getUser()
  //   );

  // } else {
  //   document.getElementById("gated-content").classList.add("hidden");
  // }




  //logout function
  const logout = () => {
    auth0.logout({
      returnTo: window.location.origin
    });
  };