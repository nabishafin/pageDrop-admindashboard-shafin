import { baseApi } from "@/redux/api/baseApi";

export const promocodesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all promo codes
    getAllCoupons: builder.query({
      query: (params) => {
        console.log("API Query Params:", params);
        const { page = 1, limit = 10, search = '', status = 'All' } = params;
        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('limit', limit);
        if (search) {
          queryParams.append('search', search);
        }
        if (status !== 'All') {
          queryParams.append('status', status);
        }
        return {
          url: `/auth/coupons?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ["Coupons"],
    }),

    // ✅ Get a single coupon by ID
    getCouponById: builder.query({
      query: (id) => ({
        url: `/auth/coupons/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Coupons", id }],
    }),

    // ✅ Create a new coupon
    createCoupon: builder.mutation({
      query: (data) => ({
        url: "/auth/coupons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Coupons"],
    }),

    // ✅ Update a coupon (optional)
    updateCoupon: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/auth/coupons/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Coupons", id },
        "Coupons",
      ],
    }),

    // ✅ Delete a coupon (optional)
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/auth/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupons"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = promocodesApi;
