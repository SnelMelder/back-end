import { NextFunction, Request, Response } from 'express';

var jwksClient = require('jwks-rsa');
var jwt = require('jsonwebtoken');

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    if (!request.headers.authorization || !request.headers.authorization.includes("Bearer ")) {
        return response.status(401).json({"Error": "User Unauthenticated"})
    }

    const token = request.headers.authorization.substring(7);
    const decoded = jwt.decode(token, {complete: true});
    if (!decoded) {
        return response.status(401).json({"Error": "User Unauthenticated"})
    }

    const verifyOptions = {
        algorithms: ['RS256'],
        header: decoded.header
    };

    const client = jwksClient({
        jwksUri: 'https://login.microsoftonline.com/b0ad87a1-0f53-4ca9-a2f2-a0e1b926e061/discovery/v2.0/keys'
    });

    async function getKey() {
        return new Promise ((resolve, reject) => {
            client.getSigningKey(decoded.header.kid, function(err: Error, key: any) {
                if (err) reject();
                const signingKey = key.publicKey || key.rsaPublicKey;
                resolve(signingKey);
            });
        }).then((key: any) => {
            if (key) return key;
            return null;
        }).catch(() => {
            return null;
        });
    };

    const publicKey = await getKey();

    if (!publicKey) return response.status(401).json({"Error": "User Unauthenticated"});

    let verified = true;
    jwt.verify(token, publicKey, verifyOptions, function(err: Error, decoded: any) {
        if (err) verified = false;
        response.locals.user = decoded;
    });

    if (!verified) {
        return response.status(401).json({"Error": "Unauthenticated"})
    }
    next();
}

export default authMiddleware;