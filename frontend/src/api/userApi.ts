import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getHeader, localServerURL } from "./instance";
import { Params, Workout } from "../shared/types";
import { SignInUser, User } from "../shared/types/user";

export type RequestSuccess = {
  user: User | null;
  isSignIn: boolean;
};

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${localServerURL}user`,
    prepareHeaders: (headers) => getHeader(headers),
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<RequestSuccess, User>({
        query: (user) => ({
          url: `/register`,
          method: "POST",
          body: user,
        }),
        invalidatesTags: () => [{ type: "User" }],
      }),
    signIn: builder.mutation<RequestSuccess, SignInUser>({
      query: (loginData) => ({
        url: `/login`,
        method: "POST",
        body: loginData,
      }),
      transformResponse: (res: any) => ({
        isSignIn: true,
        user: null,
      }),
      invalidatesTags: () => [{ type: "User" }],
    }),
    logout: builder.mutation<RequestSuccess, {}>({
      query: () => ({
        url: `/logout`,
        method: "PUT",
      }),
      invalidatesTags: () => [{ type: "User" }],
    }),
    getUser: builder.query<RequestSuccess, {}>({
      query: () => ({
        url: `/currentuser`,
        method: "GET",
      }),
      providesTags: () => [{ type: "User" }],
    }),
  }),
});

export const {
  useLogoutMutation,
  useSignInMutation,
  useSignUpMutation,
  useGetUserQuery,
} = userApi;
