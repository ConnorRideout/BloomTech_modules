import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const quotesApi = createApi({
    reducerPath: 'quotesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/quotes' }),
    tagTypes: ['Quotes'],
    endpoints: builder => ({
        getQuotes: builder.query({
            query: () => '',
            providesTags: ['Quotes']
        }),
        createQuote: builder.mutation({
            query: newQuote => ({
                url: '',
                method: 'POST',
                body: newQuote
            }),
            invalidatesTags: ['Quotes']
        }),
        toggleFake: builder.mutation({
            query: ({ id, data }) => ({
                url: `${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Quotes']
        }),
        deleteQuote: builder.mutation({
            query: id => ({
                url: `${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Quotes']
        })
    })
})

export const {
    useGetQuotesQuery,
    useCreateQuoteMutation,
    useToggleFakeMutation,
    useDeleteQuoteMutation
} = quotesApi