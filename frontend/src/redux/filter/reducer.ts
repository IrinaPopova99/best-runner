import { createReducer } from "@reduxjs/toolkit";
import { Filter } from "../../shared/types";
import { toggleFiltersAction } from "./actions";

type InitialStateFilter = {
  filters: Filter[];
}

let initialState: InitialStateFilter = {
  filters: [],
};

export const filtersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleFiltersAction, (state, action) => ({
      ...state,
      filters: action.payload,
    }))
    .addDefaultCase((state, action) => state);
});
