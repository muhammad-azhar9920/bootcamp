import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/comments',
        credentials: 'include',
    }),
    tagTypes: ['Comments'],
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (commentData) => ({
                url: '/add-comment',
                method: 'POST',
                body: commentData,
            }),
            invalidatesTags: (result, error, {postId})=>[{type: 'Comments', id: postId}]
        }),
        getComments: builder.query({
            query: () => ({
                url: '/total-comments',
                method: 'GET',
            }),
        })
    })
})

export const {useGetCommentsQuery, useAddCommentMutation} = commentApi;