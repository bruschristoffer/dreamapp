import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
  };
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Åtkomst nekad: Token saknas" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res
      .status(500)
      .json({ message: "Serverfel: JWT_SECRET saknas i miljön" });
  }
  jwt.verify(token, secret, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ message: "Ogiltig eller utgången token" });
    }
    req.user = decodedUser as { id: number; username: string };
    next();
  });
}
