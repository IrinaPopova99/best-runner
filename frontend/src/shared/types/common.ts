import { Type } from "typescript";
import { rootReducer } from "../../redux/rootReducer";

// export type StateType<Type> = {
//   articles: Type[];
// };

// export type ActionType<Type> = {
//   type: string;
//   payload: Type;
// };

// export type DispatchType = (args: ActionType<Type>) => ActionType<Type>;

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType

export type AppStateType = ReturnType<RootReducerType>

export type RootState = ReturnType<typeof rootReducer>;
