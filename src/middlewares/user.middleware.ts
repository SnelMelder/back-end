import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');

export default async function userMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (!request.headers.authorization) {
    next();
    return;
  }

  const token = request.headers.authorization.substring(7);
  const decoded = jwt.decode(token);
  // console.log(token);
  // console.log(decoded);
  response.locals.user = decoded;
  next();
}
