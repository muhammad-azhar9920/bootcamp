import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/auth",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            })
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),
        updateUser: builder.mutation({
            query: ({userId, role}) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: { role },
            }),
            refetchOnMount: true,
            invalidatesTags: ["User"]
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } = authApi;
