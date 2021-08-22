# Pizza 42 App

This sample React SPA (Single-page app) is to demonstrate Auth0 implementation and capabilities. This sample is based on the [Auth0 React SPA Quickstart](https://auth0.com/docs/quickstart/spa/react).

## Setup 
1. Clone this repository
2. [Register a Single Page App](https://auth0.com/docs/quickstart/spa/vanillajs) in Auth0
3. access `auth_config.json` and replace all placeholder values with the appropriate values from your Auth0 tenant.
	- `domain`: Your Auth0 tenant domain
	- `clientId`: `client_id` from step (2)
	- `audience`: API audience from API documentation
	-  `scope`: Permission from configuring the API
5. `npm install`
6. `npm start`

## Functionality

1. Integration with Auth0 using the [auth0-spa-js SDK](https://auth0.com/docs/libraries/auth0-single-page-app-sdk) for authentication.
2. Ability for users to sign up, password reset, as well as login using social provider (Google).
3. Restrict ordering for users that haven't logged in 
5. Requesting specific scopes during authentication flow in order to call the protected API endpoints.
