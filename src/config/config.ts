class Config {
  public readonly options = {
    identityMetadata: `https://${process.env.TENANT_NAME}.b2clogin.com/${process.env.TENANT_NAME}.onmicrosoft.com/${process.env.POLICY_NAME}/${process.env.AD_VERSION}/${process.env.AD_DISCOVERY}`,
    clientID: process.env.CLIENT_ID,
    audience: process.env.CLIENT_ID,
    policyName: process.env.POLICY_NAME,
    isB2C: true,
    validateIssuer: true,
    loggingLevel: 'info',
    passReqToCallback: false,
  };
}

export default Config;
