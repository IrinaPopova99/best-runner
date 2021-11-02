import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { localServerURL } from "../../api/instance";
import { Params, Workout } from "../../shared/types";

export type RequestSuccess = {
  workouts: Workout[];
  totalPages: number;
  typesWorkout: string[];
};

export const getHeader = (headers: Headers) => {
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  return headers;
}

export const workoutApi = createApi({
  reducerPath: "workoutApi",
  tagTypes: ["Workouts"],
  baseQuery: fetchBaseQuery({
    baseUrl: localServerURL,
    prepareHeaders: (headers) => getHeader(headers),
  }),
  endpoints: (builder) => ({
    getAllWorkouts: builder.query<RequestSuccess, Params>({
      query: (params: Params | undefined) => ({
        url: `?size=${params?.size || 5}&page=${params?.page || 1}${params?.filters ? `&filter=${params?.filters}` : ''}`,
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
