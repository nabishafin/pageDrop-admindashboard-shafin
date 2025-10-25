import baseApi from "@/redux/api/baseApi";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all FAQs
    getFaqs: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      providesTags: ["Faq"],
    }),

    // ✅ Get a single FAQ by ID
    getFaqById: builder.query({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Faq", id }],
    }),

    // ✅ Create a new FAQ
    addFaq: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faq"],
    }),

    // ✅ Update a FAQ
    editFaq: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Faq", id }, "Faq"],
    }),

    // ✅ Delete a FAQ
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faq"],
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqByIdQuery,
  useAddFaqMutation,
  useEditFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
