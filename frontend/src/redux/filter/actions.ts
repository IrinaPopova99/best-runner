import { createAction, Dispatch } from "@reduxjs/toolkit";
import { Filter } from "../../shared/types";

export const toggleFiltersAction = createAction<Filter[]>("TOGGLE");

export const toggleFilters = (filters: Filter[]) => (dispatch: Dispatch) => {
  dispatch(toggleFiltersAction(filters));
};
