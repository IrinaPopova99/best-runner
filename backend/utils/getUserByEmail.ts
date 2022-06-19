import { NextFunction, Request, Response } from "express";
import UserModel from "../models/UserModel";
import { IUser } from "../types/user";

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const res = await UserModel.findOne({ email: req.body.email });
    return next();
  } catch (err) {
    return next(new Error("This email has already taken"));
  }
};
