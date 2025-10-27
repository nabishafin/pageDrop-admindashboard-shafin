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

    // 04. get user by token
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

    // 06. forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // store reset token
          const token =
            data?.resetPasswordToken || data?.data?.resetPasswordToken;
          if (token) localStorage.setItem("resetPasswordToken", token);

          // store email
          if (arg.email) localStorage.setItem("resetEmail", arg.email);
        } catch (error) {
          console.error("❌ Forgot password error:", error);
        }
      },
    }),

    // 07. verify email/OTP
    verifyEmail: builder.mutation({
      query: ({ otp, email }) => {
        const isFromForgotPassword = !!email;
        const resetToken = localStorage.getItem("resetPasswordToken");

        if (isFromForgotPassword) {
          // for forgot password
          return {
            url: `/auth/verify-email-otp`,
            method: "POST",
            body: { email, otp },
            headers: resetToken
              ? { Authorization: `Bearer ${resetToken}` }
              : {},
          };
        }

        // for regular signup verification
        return {
          url: `/auth/verify-email`,
          method: "POST",
          body: { email, otp },
        };
      },
      invalidatesTags: ["auth"],
      async onQueryStarted({ email }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const token =
            data?.resetPasswordToken || data?.data?.resetPasswordToken;
          if (email && token) {
            localStorage.setItem("resetPasswordToken", token);
          }
        } catch (error) {
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

    // 08. reset password (uses stored token)
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
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          console.log("✅ Password reset successful!");
          localStorage.removeItem("resetPasswordToken");
          localStorage.removeItem("resetEmail");
        } catch (error) {
          console.error("❌ Reset password error:", error);
        }
      },
    }),

    // 09. change password (for logged-in user)
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/users/update-admin-password`,
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
  useChangePasswordMutation,
  useGetUserByTokenQuery,
  useUpdateUserMutation,
} = authApi;
