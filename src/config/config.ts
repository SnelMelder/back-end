import { passportJwtSecret } from 'jwks-rsa';

const { ExtractJwt } = require('passport-jwt');

class Config {
  public readonly options = {
    identityMetadata: `https://login.microsoftonline.com/${process.env.TENANT_ID}/discovery/v2.0/keys`,
    clientID: process.env.CLIENT_ID,
    audience: process.env.CLIENT_ID,
    policyName: process.env.POLICY_NAME,
    isB2C: false,
    validateIssuer: true,
    loggingLevel: 'info',
    passReqToCallback: false,
  };

  public readonly jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    secretOrKeyProvider: passportJwtSecret({
      jwksUri: `https://login.microsoftonline.com/${process.env.TENANT_ID}/discovery/v2.0/keys`,
    }),
    algorithms: ['RS256'],
    audience: process.env.CLIENT_ID, //ToDO: Get Audience from azure
    issuer: `https://sts.windows.net/${process.env.TENANT_ID}/`,
  };

  public verify = (jwt_payload: any, done:any) => {
    console.log('Signature is valid for the JSON Web Token (JWT), let\'s check other things...');
    console.log(jwt_payload);

    return done(null, false);
  };
}

export default Config;
