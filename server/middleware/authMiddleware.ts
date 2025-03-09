import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

interface DecodeToken extends JwtPayload {
  sub: string;
  "customer:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (allowedRules: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      const decoded = jwt.decode(token) as DecodeToken;
      const userRole = decoded["customer:role"] || "";
      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRules.includes(userRole.toLowerCase());
      if (!hasAccess) {
        res.status(403).json({ message: "Access Denied" });
        return;
      }
    } catch (err) {
      console.log("Failed to decode the token");
      res.status(400).json({ message: "Invalid Token" });
    }
    next();
  };
};
