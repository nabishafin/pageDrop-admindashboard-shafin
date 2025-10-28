import baseApi from "../../api/baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ 01. Get Terms & Conditions
    getTermsConditions: builder.query({
      query: () => ({
        url: "/auth/get-terms-and-condition",
        method: "GET",
      }),
      providesTags: ["terms"],
    }),

    // ✅ 02. Update Terms & Conditions
    updateTermsConditions: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/auth/update-terms-and-condition/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["terms"],
    }),

    // ✅ 03. Get Privacy Policy
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/auth/get-privacy-and-policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),

    // ✅ 04. Update Privacy Policy
    updatePrivacyPolicy: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/auth/update-privacy-and-policy/${id}`, // ✅ এটা ঠিক আছে
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
});

export const {
  useGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
} = settingsApi;
