import baseApi from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 01. login
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/admin-login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["auth"],
    }),

    // 02. refresh token
    refreshToken: builder.mutation({
      query: () => {
        const refreshToken = localStorage.getItem("refreshToken");
        return {
          url: "/auth/refresh-auth",
          method: "POST",
          body: { refreshToken },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 03. logout
    logout: builder.mutation({
      query: () => {
        const refreshToken = localStorage.getItem("refreshToken");
        return {
          url: "/auth/logout",
          method: "POST",
          body: { refreshToken },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 04. get user by token - for protected routes
    getUserByToken: builder.query({
      query: () => ({ url: `/user/my-profile`, method: "GET" }),
      providesTags: ["auth"],
    }),

    // 05. update user
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // 06. forgot password - IMPROVED to handle token response
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
      // Handle response to store reset token
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Store reset password token if provided in response
          if (data?.resetPasswordToken) {
            localStorage.setItem("resetPasswordToken", data.resetPasswordToken);
          } else if (data?.data?.resetPasswordToken) {
            localStorage.setItem(
              "resetPasswordToken",
              data.data.resetPasswordToken
            );
          }

          // Store email for the flow
          if (arg.email) {
            localStorage.setItem("resetEmail", arg.email);
          }
        } catch (error) {
          // console.error("❌ Forgot password error:", error);
        }
      },
    }),

    // 07. verify email/OTP - IMPROVED error handling
    verifyEmail: builder.mutation({
      query: ({ otp, email }) => {
        const isFromForgotPassword = !!email;
        const resetToken = localStorage.getItem("resetPasswordToken");

        if (isFromForgotPassword) {
          // For forgot password verification
          return {
            url: `/auth/verify-email-otp`,
            method: "POST",
            body: { otp },
            headers: resetToken
              ? { Authorization: `Bearer ${resetToken}` }
              : {},
          };
        }

        // For regular email verification (signup)
        return {
          url: `/auth/verify-email`,
          method: "POST",
          body: { otp },
        };
      },
      invalidatesTags: ["auth"],
      async onQueryStarted({ email }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // Update token if provided in verification response
          if (email && data?.resetPasswordToken) {
            localStorage.setItem("resetPasswordToken", data.resetPasswordToken);
          } else if (email && data?.data?.resetPasswordToken) {
            localStorage.setItem(
              "resetPasswordToken",
              data.data.resetPasswordToken
            );
          }
        } catch (error) {
          // console.error("❌ Verify email error:", error);

          // If token is invalid, clear it
          if (
            error?.data?.message?.includes("invalid") ||
            error?.data?.message?.includes("expired")
          ) {
            localStorage.removeItem("resetPasswordToken");
            localStorage.removeItem("resetEmail");
          }
        }
      },
    }),

    // 10. change password (for logged-in users)
    changePassword: builder.mutation({
      query: (data) => ({
        url: `users/update-admin-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useChangePasswordMutation,
  useGetUserByTokenQuery,
  useUpdateUserMutation,
} = authApi;
