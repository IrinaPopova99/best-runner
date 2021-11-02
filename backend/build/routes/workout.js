"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workoutControllers_js_1 = require("../controllers/workoutControllers.js");
const router = express_1.default.Router();
router.get("/", workoutControllers_js_1.getWorkouts);
router.post("/", workoutControllers_js_1.createWorkout);
router.get("/:id", workoutControllers_js_1.getWorkoutById);
router.delete("/:id", workoutControllers_js_1.deleteWorkout);
router.patch("/:id", workoutControllers_js_1.updateWorkout);
exports.default = router;
//# sourceMappingURL=workout.js.map