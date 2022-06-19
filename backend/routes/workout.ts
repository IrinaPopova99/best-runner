import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  updateWorkout,
  getWorkoutById,
} from "../controllers/WorkoutControllers.js";

const router = express.Router();

router.get("/", verifyToken, getWorkouts);

router.post("/", verifyToken, createWorkout);

router.get("/:id", verifyToken, getWorkoutById);

router.delete("/:id", verifyToken, deleteWorkout);

router.patch("/:id", verifyToken, updateWorkout);

export default router;
