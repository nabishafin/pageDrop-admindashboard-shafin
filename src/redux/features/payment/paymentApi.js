import baseApi from "@/redux/api/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all payments for admin with pagination and filters
    getAllPayments: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        subscription = "all",
        paymentStatus = "all",
        timeRange = "all",
        startDate = "",
        endDate = "",
      }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        if (search) params.append("search", search);
        if (subscription && subscription !== "all")
          params.append("subscription", subscription);
        if (paymentStatus && paymentStatus !== "all")
          params.append("paymentStatus", paymentStatus);
        if (timeRange && timeRange !== "all")
          params.append("timeRange", timeRange);

        // Append date range if provided
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        return {
          url: `/payments?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["payments"],
    }),
  }),
});

export const { useGetAllPaymentsQuery } = paymentApi;
