import { rootReducer } from "../../redux/rootReducer";

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>

export type RootState = ReturnType<typeof rootReducer>;

export type NameWeekDaysWithDistancePerDay = { name: string; distance: number };
