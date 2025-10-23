import baseApi from "@/redux/api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get users for admin with pagination and filters
    getUsers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "all",
        subscription = "all",
        timeRange = "all",
      }) => {
        const params = new URLSearchParams();

        params.append("page", page.toString());
        params.append("limit", limit.toString());

        // Append all parameters
        if (search) params.append("search", search);
        if (status && status !== "all") params.append("status", status);
        if (subscription && subscription !== "all")
          params.append("subscription", subscription);
        if (timeRange && timeRange !== "all")
          params.append("timeRange", timeRange);

        const url = `/users/get-users-for-admin?${params.toString()}`;
        console.log("API URL:", url);

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["admin-users"],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
export default userApi;
