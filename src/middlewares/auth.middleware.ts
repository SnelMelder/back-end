import { auth, claimIncludes } from 'express-oauth2-jwt-bearer';

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

const availableScopes = {
  users: {
    read: 'users:read',
  },
  reports: {
    create: 'reports:create',
  },
  locations: {
    create: 'locations:write',
    read: 'locations:read',
    update: 'locations:update',
    delete: 'locations:delete',
  },
};

const requiredScopes = (...scopes: string[]) => claimIncludes('scp', ...scopes);

export { requiredScopes, checkJwt, availableScopes as scopes };
