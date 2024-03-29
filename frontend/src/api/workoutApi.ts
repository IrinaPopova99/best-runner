import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeader, localServerURL } from "./instance";
import { Params, Workout } from "../shared/types";

export type RequestSuccess = {
  workouts: Workout[];
  totalPages: number;
  typesWorkout: string[];
};

export const workoutApi = createApi({
  reducerPath: "workoutApi",
  tagTypes: ["Workouts"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${localServerURL}workout/`,
    prepareHeaders: (headers) => getHeader(headers),
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getAllWorkouts: builder.query<RequestSuccess, Params>({
      query: (params: Params | undefined) => ({
        url: `?size=${params?.size || 0}&page=${params?.page || 1}${
          params?.filters ? `&filter=${params?.filters}` : ""
        }`,
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
    updateWorkout: builder.mutation<
      RequestSuccess,
      Partial<{ id: string; workout: Workout }>
    >({
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
