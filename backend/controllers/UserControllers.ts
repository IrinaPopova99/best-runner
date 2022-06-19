import { v4 as uuid4 } from "uuid";
import { errorMessage } from "../constants/errors";
import UserModel from "../models/UserModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser, LoginUser } from "../types/user";
import { Request, Response } from "express";
import { generateAuthAccessToken, generateAuthRefreshToken } from "../utils/generateAuthToken";
import { verifyRefreshToken } from "middlewares/auth";

export const registerUser = async (
  req: Request<{}, {}, IUser>,
  res: Response
) => {
  try {
    const user = req.body;
    const { email, firstName, lastName, avatar, password, workouts } = user;

    const encodedPassword = await bcrypt.hash(req.body.password, 10);

    if (!avatar) user.avatar = "";
    if (workouts?.length <= 0) user.workouts = [];

    const dbUser = new UserModel({
      email,
      firstName,
      lastName,
      avatar,
      password: encodedPassword,
      workouts,
    });
    dbUser.save();

    res.status(200).json({ });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginUser>,
  res: Response
) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid Email address");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Password or email is incorrect");

    const token = generateAuthAccessToken(user);
    const refreshToken = generateAuthRefreshToken(user);

    res.cookie("access_token", token, { httpOnly: true, secure: false, expires: new Date(Date.now() + process.env.JWT_EXPIRATION_TIME) })
      .cookie("refresh_token", refreshToken, { httpOnly: true, secure: false });
    
    return res.status(200).json({ });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: "Something went wrong" });
  }
};

export const logoutUser = async (
  req: Request<{}, {}, LoginUser>,
  res: Response
) => {
  try {
    return res.json({ });
  } catch (err: any) {
    return res.status(500).json({ message: 'error' });
  } 
};

export const refreshToken = async (
  req: any,
  res: Response,
) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.status(500).json({ message: 'error' });
    // const userId = await verifyRefreshToken(refreshToken)
    let user = await UserModel.findOne({ _id: req.userId });
    if (!user) return res.status(400).send("Invalid Email address");

    const accessToken = await generateAuthAccessToken(user)
    const newRefreshToken = generateAuthRefreshToken(user);
    res.cookie("access_token", accessToken, { httpOnly: true, secure: false, expires: new Date(Date.now() + process.env.JWT_EXPIRATION_TIME) })
      .cookie("refresh_token", newRefreshToken, { httpOnly: true, secure: false });

    return res.status(200).json({ });
  } catch (error) {
    res.status(500).json({ message: 'error' });
  }
}

export const getUser = async (
  req: any,
  res: Response,
) => {
  const token = req.cookies.access_token;

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    let user = await UserModel.findOne({ _id: data._id });
    if (!user) return res.status(400).send("User doesn't exist");

    return res.status(200).json({ user });
  } catch (err: any) {
    return res.status(403).json({ ...err });
  }
}