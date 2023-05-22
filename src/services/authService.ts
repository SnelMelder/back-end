import * as msal from '@azure/msal-node';

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const authority = process.env.AUTHORITY;
const clientSecret = process.env.CLIENT_SECRET;
const scope = 'https://graph.microsoft.com/.default';

const clientConfig = {
  auth: {
    clientId,
    authority,
    clientSecret,
  },
};

const cca = new msal.ConfidentialClientApplication(clientConfig);

export default async function getAccessToken() {
  const clientCredentialRequest = {
    scopes: [scope],
  };

  const response = await cca.acquireTokenByClientCredential(
    clientCredentialRequest,
  );

  return response.accessToken;
}
