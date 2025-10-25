import baseApi from "@/redux/api/baseApi";

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all support tickets (for admin)
    getSupportTickets: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "all",
        timeRange = "all",
      }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        if (search) params.append("search", search);
        if (status && status !== "all") params.append("status", status);
        if (timeRange && timeRange !== "all")
          params.append("timeRange", timeRange);

        const url = `/support?${params.toString()}`;
        console.log("Support API URL:", url);

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["support-tickets"],
      keepUnusedDataFor: 0,
    }),

    // ✅ Update support ticket status
    updateSupportStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/support/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["support-tickets"],
    }),
  }),
});

export const { useGetSupportTicketsQuery, useUpdateSupportStatusMutation } =
  supportApi;
export default supportApi;
