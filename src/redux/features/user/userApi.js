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
        startDate = "",
        endDate = "",
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

        // Append date range if provided
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

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

    // Assign subscription to user
    assignSubscription: builder.mutation({
      query: (data) => ({
        url: "/users/admin/assign-subscription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin-users"],
    }),

    // Create a new user (Admin only)
    createUser: builder.mutation({
      query: (data) => ({
        url: "/users/admin/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin-users"],
    }),

    // Block or Unblock a user
    blockUser: builder.mutation({
      query: ({ userId, isBlocked }) => ({
        url: `/users/admin/block-user/${userId}`,
        method: "PATCH",
        body: { isBlocked },
      }),
      invalidatesTags: ["admin-users"],
    }),

    // Update user details
    updateUserAdmin: builder.mutation({
      query: ({ userId, data }) => ({
        url: `/users/admin/update-user/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["admin-users"],
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: ({ email }) => ({
        url: `/users/delete-user-from-ui`,
        method: "DELETE",
        body: { email },
      }),
      invalidatesTags: ["admin-users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAssignSubscriptionMutation,
  useCreateUserMutation,
  useBlockUserMutation,
  useUpdateUserAdminMutation,
  useDeleteUserMutation
} = userApi;

// export const { useGetUsersQuery, useAssignSubscriptionMutation, useDeleteUserMutation } = userApi;
export default userApi;
