import baseApi from "@/redux/api/baseApi";

export const adminOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ 1. Get Admin Overview Data (Dashboard Summary)
    getAdminOverview: builder.query({
      query: ({ timeFilter = "all" } = {}) => {
        const params = new URLSearchParams();

        if (timeFilter && timeFilter !== "all") {
          params.append("timeFilter", timeFilter);
        }

        const url = `/auth/admin/overview?${params.toString()}`;
        console.log("Admin Overview API URL:", url);

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["admin-overview"],
      keepUnusedDataFor: 0,
    }),

    // ✅ 2. Get Admin Overview Graph Data
    getAdminOverviewGraph: builder.query({
      query: () => ({
        url: `/auth/admin/overview/graph`,
        method: "GET",
      }),
      providesTags: ["admin-overview-graph"],
      keepUnusedDataFor: 0,
    }),

    // ✅ 3. Get Active Coupons for Admin Dashboard
    getAdminActiveCoupons: builder.query({
      query: () => ({
        url: `/auth/get-coupon-for-the-admin-dashboard`,
        method: "GET",
      }),
      providesTags: ["admin-active-coupons"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetAdminOverviewQuery,
  useGetAdminOverviewGraphQuery,
  useGetAdminActiveCouponsQuery,
} = adminOverviewApi;

export default adminOverviewApi;
