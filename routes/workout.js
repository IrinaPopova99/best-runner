import express from 'express';
import { createWorkout, deleteWorkout, getWorkouts, updateWorkout, getWorkoutById } from '../controllers/workout.js'

const router = express.Router();

router.get('/', getWorkouts);

router.post('/', createWorkout);

router.get('/:id', getWorkoutById);

router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout);

export default router;