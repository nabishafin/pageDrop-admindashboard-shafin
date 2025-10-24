import { baseApi } from "@/redux/api/baseApi";

export const promocodesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all promo codes
    getAllCoupons: builder.query({
      query: () => ({
        url: "/auth/coupons",
        method: "GET",
      }),
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
