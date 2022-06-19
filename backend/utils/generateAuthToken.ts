import { IUser } from "../types/user";
import jwt from "jsonwebtoken";

export const generateAuthAccessToken = (user: IUser) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.firstName,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION_TIME }
  );

  return token;
};

export const generateAuthRefreshToken = (user: IUser) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.firstName,
    },
    process.env.JWT_SECRET_REFRESH,
    { expiresIn: "30d"}
  );

  return token;
};
