import { passportJwtSecret } from 'jwks-rsa';

const { ExtractJwt } = require('passport-jwt');

class Config {
  private loggingText: string = 'Checking if JWT is valid, Payload:';

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
    audience: process.env.CLIENT_ID, // ToDO: Get Audience from azure
    issuer: `https://sts.windows.net/${process.env.TENANT_ID}/`,
  };

  public verify = (jwt_payload: any, done: any) => {
    console.log(this.loggingText);
    console.log(jwt_payload);

    return done(null, false);
  };
}

export default Config;
