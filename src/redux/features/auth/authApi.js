import baseApi from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 01. login
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
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
            url: `/auth/verify-email`,
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

    // 08. resend otp - FIXED for proper token update
    resendOtp: builder.mutation({
      query: (email) => {
        if (email && typeof email === "string") {
          // For forgot password flow - resend with reset token
          const resetToken = localStorage.getItem("resetPasswordToken");

          return {
            url: `/auth/resend-otp`,
            method: "POST",
            body: { email },
            headers: resetToken
              ? { Authorization: `Bearer ${resetToken}` }
              : {},
          };
        }

        // For regular signup verification
        return {
          url: `/auth/resend-otp`,
          method: "POST",
          body: {},
        };
      },
      invalidatesTags: ["auth"],
      // IMPORTANT: Handle response IMMEDIATELY to update token
      transformResponse: (response, meta, arg) => {
        // If this is forgot password flow and we got a new token
        if (arg && typeof arg === "string") {
          // Check for token in response.data.resetPasswordToken (actual backend response)
          const newToken =
            response?.data?.resetPasswordToken || response?.resetPasswordToken;

          if (newToken) {
            const oldToken = localStorage.getItem("resetPasswordToken");

            // Update token immediately
            localStorage.setItem("resetPasswordToken", newToken);
          } else {
          }
        }

        return response;
      },
      // BACKUP: Also handle in onQueryStarted as fallback
      async onQueryStarted(email, { dispatch, queryFulfilled }) {
        try {
          const oldToken = localStorage.getItem("resetPasswordToken");

          const { data } = await queryFulfilled;

          // Double-check token update - Check both locations
          if (email && typeof email === "string") {
            const newTokenFromResponse =
              data?.data?.resetPasswordToken || data?.resetPasswordToken;

            if (newTokenFromResponse) {
              const currentToken = localStorage.getItem("resetPasswordToken");

              if (currentToken !== newTokenFromResponse) {
                localStorage.setItem(
                  "resetPasswordToken",
                  newTokenFromResponse
                );
              }
            } else {
            }
          }
        } catch (error) {
          // console.error("❌ Resend OTP error:", error);
          // console.error("📋 Error details:", error?.data);
        }
      },
    }),

    // 09. reset password - Uses stored reset token
    resetPassword: builder.mutation({
      query: (data) => {
        const resetToken = localStorage.getItem("resetPasswordToken");

        return {
          url: `/auth/reset-password`,
          method: "POST",
          body: data,
          headers: resetToken ? { Authorization: `Bearer ${resetToken}` } : {},
        };
      },
      invalidatesTags: ["auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          // Clean up tokens after successful reset
          localStorage.removeItem("resetPasswordToken");
          localStorage.removeItem("resetEmail");
        } catch (error) {
          // console.error("❌ Reset password error:", error);
        }
      },
    }),

    // 10. change password (for logged-in users)
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/user/change-password`,
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
  useResetPasswordMutation,
  useResendOtpMutation,
  useChangePasswordMutation,
  useGetUserByTokenQuery,
  useUpdateUserMutation,
} = authApi;
