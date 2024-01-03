import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/axios";
import {
  AccessDto,
  UserDto,
  FileDto,
  UpdateUserDto,
  UpdateFileDto,
  SignInDto,
  SignUpDto,
  API_TAG,
} from "@/@types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseQuery: "" }),
  tagTypes: Object.values(API_TAG),
  endpoints: (builder) => ({
    signUp: builder.mutation<AccessDto, SignUpDto>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        data,
      }),
    }),

    signIn: builder.mutation<AccessDto, SignInDto>({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        data,
      }),
    }),

    refresh: builder.mutation<AccessDto, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    getUsers: builder.query<UserDto[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: API_TAG.USER, _id })),
              API_TAG.USER,
            ]
          : [API_TAG.USER],
    }),

    getUsersExceptMe: builder.query<UserDto[], void>({
      query: () => ({
        url: "/users/except-me",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: API_TAG.USER, id: _id })),
              API_TAG.USER,
            ]
          : [API_TAG.USER],
    }),

    getUser: builder.query<UserDto, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: API_TAG.USER, id }],
    }),

    getMe: builder.query<UserDto, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: (result) =>
        result ? [{ type: API_TAG.USER, id: result._id }] : [API_TAG.USER],
    }),

    updateUser: builder.mutation<UserDto, { id: string; data: UpdateUserDto }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: API_TAG.USER, id }],
    }),

    deleteUser: builder.mutation<UserDto, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: API_TAG.USER, id }],
    }),

    createFile: builder.mutation<FileDto, FormData>({
      query: (body) => ({
        url: "/files",
        method: "POST",
        body,
      }),
      invalidatesTags: [API_TAG.FILE],
    }),

    getFiles: builder.query<FileDto[], void>({
      query: () => ({
        url: "/files",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: API_TAG.FILE, _id })),
              API_TAG.FILE,
            ]
          : [API_TAG.FILE],
    }),

    getFile: builder.query<FileDto, string>({
      query: (id) => ({
        url: `/files/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: API_TAG.FILE, id }],
    }),

    deleteFile: builder.mutation<FileDto, string>({
      query: (id) => ({
        url: `/files/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: API_TAG.FILE, id }],
    }),

    updateFile: builder.mutation<FileDto, { id: string; data: UpdateFileDto }>({
      query: ({ id, data }) => ({
        url: `/files/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: API_TAG.FILE, id }],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useRefreshMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useGetUsersExceptMeQuery,
  useGetUserQuery,
  useGetMeQuery,
  useLazyGetMeQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateFileMutation,
  useGetFilesQuery,
  useGetFileQuery,
  useDeleteFileMutation,
  useUpdateFileMutation,
} = api;
