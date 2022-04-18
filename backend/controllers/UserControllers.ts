import { v4 as uuid4 } from "uuid";
import { errorMessage } from "../constants/errors";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser, LoginUser } from "../types/user";
import { Request, Response } from "express";

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

    res.status(200).json({ message: "Success" });
  } catch (err: any) {
    res.status(err.status || 500).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (
  req: Request<{}, {}, LoginUser>,
  res: Response
) => {
  try {
    const user = req.body;
    UserModel.findOne({ email: user.email })
    .then(dbUser => {
      if (!dbUser) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      bcrypt.compare(user.password, dbUser.password)
      .then(isCorrect => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            email: dbUser.email,
          };
          // jwt.sign(
          //   payload,
          //   process?.env?.JWT_SECRET,
          //   { expiresIn: 86400 },
          //   (err, token) => {
          //     if (err) return res.json({ message: err });
          //     return res.status(200).json({
          //       message: "Success",
          //       token: "Bearer " + token
          //     })
          //   }
          // )
        } else {
          return res.status(401).json({
            message: "Invalid email or password"
          })
        }
      })
    })

  } catch (err: any) {
    res.status(err.status || 500).json({ message: 'Something went wrong' });
  }
};
