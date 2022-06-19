import express from "express";
import { verifyToken } from "../middlewares/auth";
import { loginUser, registerUser, logoutUser, getUser } from "../controllers/UserControllers";
import { validate } from "../middlewares/validate";
import { getUserByEmail } from "../utils/getUserByEmail";
import { signUpSchema } from '../validation-schemas/signUpSchema';

const router = express.Router();

router.post("/register", getUserByEmail, validate(signUpSchema), registerUser);
router.post("/login", loginUser);
router.put("/logout", verifyToken, logoutUser);
router.get("/currentuser", verifyToken, getUser);

export default router;
