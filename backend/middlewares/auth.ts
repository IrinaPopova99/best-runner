import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.cookies.access_token;

  if (token == null) return res.sendStatus(403);

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    req.userId = data._id;

    return next();
  } catch (err: any) {
    return res.status(403).json({ ...err });
  }
};

export function verifyRefreshToken(req, res, next) {
  const token = req.cookies.refresh_token;

  if (token == null) return res.sendStatus(403);

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_REFRESH) as JwtPayload;
    req.userId = data._id;

    return next();
  } catch (err: any) {
    return res.status(403).json({ ...err });
  }
};