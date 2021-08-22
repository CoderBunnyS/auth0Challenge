//instantiate the client 
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: 'dev-z5txzw3n.us.auth0.com',
  client_id: 'ohAFsb6pY35XxEU8C0hKsT9bhYCIG1P6',
  redirect_uri: 'https://authpizza.herokuapp.com'
});

//check the session
try {
  await getTokenSilently();
} catch (error) {
  if (error.error !== 'login_required') {
    throw error;
  }
}