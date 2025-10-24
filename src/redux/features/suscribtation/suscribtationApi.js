import baseApi from "@/redux/api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all subscription plans
    getSubscriptionPlans: builder.query({
      query: () => ({
        url: "/users/subscription-plans",
        method: "GET",
      }),
      providesTags: ["SubscriptionPlans"],
    }),

    // Create new subscription plan
    createSubscriptionPlan: builder.mutation({
      query: (planData) => ({
        url: "/users/subscription-plans",
        method: "POST",
        body: planData,
      }),
      invalidatesTags: ["SubscriptionPlans"],
    }),

    // Update subscription plan
    updateSubscriptionPlan: builder.mutation({
      query: ({ _id, ...planData }) => ({
        url: `/users/subscription-plans/${_id}`,
        method: "PUT",
        body: planData,
      }),
      invalidatesTags: ["SubscriptionPlans"],
    }),

    // Delete subscription plan
    deleteSubscriptionPlan: builder.mutation({
      query: (id) => ({
        url: `/users/subscription-plans/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubscriptionPlans"],
    }),

    // Get subscription analytics
    getSubscriptionAnalytics: builder.query({
      query: () => ({
        url: "/users/subscription-plans-analytics",
        method: "GET",
      }),
      providesTags: ["SubscriptionAnalytics"],
    }),
  }),
});

export const {
  useGetSubscriptionPlansQuery,
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
  useGetSubscriptionAnalyticsQuery,
} = subscriptionApi;

export default subscriptionApi;
