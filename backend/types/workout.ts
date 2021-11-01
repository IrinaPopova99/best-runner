export type Workout = {
  id: string;
  date: Date;
  typeWorkout: TypeWorkout;
  distance: number;
  comment: string;
};

export type TypeWorkout = "Бег" | "Ходьба" | "Велосипед" | "Лыжи";