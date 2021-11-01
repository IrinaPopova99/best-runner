import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { localServerURL } from "../../api/instance";
import { Pagination, Workout } from "../../shared/types";

export type RequestSuccess = {
  workouts: Workout[];
  totalPages: number;
};

export const workoutApi = createApi({
  reducerPath: "workoutApi",
  tagTypes: ["Workouts"],
  baseQuery: fetchBaseQuery({
    baseUrl: localServerURL,
    prepareHeaders: (headers) => {
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllWorkouts: builder.query<RequestSuccess, Pagination>({
      query: (pagination: Pagination | undefined) => ({
        url: `?size=${pagination?.size || 5}&page=${pagination?.page}`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Workouts" }],
    }),
    deleteWorkouts: builder.mutation<RequestSuccess, { ids: string[] }>({
      query: ({ ids }) => ({
        url: `${ids}`,
        method: "DELETE",
      }),
      invalidatesTags: () => [{ type: "Workouts" }],
    }),
    updateWorkout: builder.mutation<RequestSuccess, Partial<{ id: string; workout: Workout }>>({
      query: ({ id, workout }) => ({
        url: `${id}`,
        method: "PATCH",
        body: workout,
      }),
      invalidatesTags: () => [{ type: "Workouts" }],
    }),
    createWorkout: builder.mutation<RequestSuccess, Partial<Workout>>({
      query: (workout) => ({
        url: ``,
        method: "POST",
        body: workout,
      }),
      invalidatesTags: () => [{ type: "Workouts" }],
    }),
  }),
});

export const {
  useGetAllWorkoutsQuery,
  useDeleteWorkoutsMutation,
  useUpdateWorkoutMutation,
  useCreateWorkoutMutation,
} = workoutApi;
