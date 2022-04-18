import express from "express";
import { registerUser } from "../controllers/UserControllers";
import { validate } from "../middlewares/validate";
import { getUserByEmail } from "../utils/getUserByEmail";
import { signUpSchema } from '../validation-schemas/signUpSchema';

const router = express.Router();

router.post("/register", getUserByEmail, validate(signUpSchema), registerUser);

export default router;
