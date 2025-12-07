import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    const secret = config.jwt_secret;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing",
      });
    }

    const decode = jwt.verify(token as string, secret as string) as JwtPayload;

    req.user = decode;
    if (roles.length && !roles.includes(decode.role as string)) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied. You do not have permission to perform this action.",
      });
    }
    next();
  };
};
export default auth;
