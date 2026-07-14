import { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }

  const secret = token.replace("Bearer ", "");

  if (secret !== process.env.MEDIA_SERVER_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Invalid secret",
    });
  }

  next();
}