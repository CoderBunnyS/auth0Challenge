// import createAuth0Client from '@auth0/auth0-spa-js';

// //with async/await
// const auth0 = await createAuth0Client({
//   domain: 'dev-z5txzw3n.us.auth0.com',
//   client_id: 'ohAFsb6pY35XxEU8C0hKsT9bhYCIG1P6',
//   redirect_uri: 'https://authpizza.herokuapp.com/'
// });

// //with promises
// createAuth0Client({
//   domain: 'dev-z5txzw3n.us.auth0.com',
//   client_id: 'ohAFsb6pY35XxEU8C0hKsT9bhYCIG1P6',
//   redirect_uri: 'https://authpizza.herokuapp.com/'
// }).then(auth0 => {
//   //...
// });

//or, you can just instantiate the client on it's own
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: 'dev-z5txzw3n.us.auth0.com',
  client_id: 'ohAFsb6pY35XxEU8C0hKsT9bhYCIG1P6',
  redirect_uri: 'https://authpizza.herokuapp.com/callback'
});

//if you do this, you'll need to check the session yourself
try {
  await getTokenSilently();
} catch (error) {
  if (error.error !== 'login_required') {
    throw error;
  }
}