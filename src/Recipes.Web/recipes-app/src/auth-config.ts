export const msalConfig = {
  auth: {
    clientId: '98f727b1-2dde-41cf-b0e2-e752982d9b8a',
    authority: 'https://login.microsoftonline.com/b36be497-4ca4-43a0-bcb3-89be6aff0705', // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: process.env.REACT_APP_UI_URL,
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['User.Read'],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: 'Enter_the_Graph_Endpoint_Here/v1.0/me',
};
