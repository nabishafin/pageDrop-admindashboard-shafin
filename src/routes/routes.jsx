import { createBrowserRouter } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import SignInPage from "../pages/auth/SignInPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OTPVerification from "../pages/auth/OTPVerification";
import ResetPassword from "../pages/auth/ResetPassword";

// Dashboard Pages
import DashboardOverview from "@/pages/dashboardpages/DashboardOverview/DashboardOverview";
import AllNotifications from "@/pages/dashboardpages/notification/AllNotifications";
import AllUsers from "@/pages/dashboardpages/user/AllUsers";
import Payments from "@/pages/dashboardpages/payment/Payments";
import Subscriptions from "@/pages/dashboardpages/suscribtation/Subscriptions";
import PromoCodes from "@/pages/dashboardpages/promoCodes/PromoCodes";
import Support from "@/pages/dashboardpages/support/Support";
import FAQ from "@/pages/dashboardpages/settings/FAQ";
import ResetPasswordSetting from "@/pages/dashboardpages/settings/ResetPasswordSetting";
import TermsAndConditions from "@/pages/dashboardpages/terms/TermsAndConditions";
import PrivacyPolicy from "@/pages/dashboardpages/privacypolicy/PrivacyPolicy";
import EditTermsAndConditions from "@/pages/dashboardpages/terms/EditTermsAndConditions";
import EditPrivacyPolicy from "@/pages/dashboardpages/privacypolicy/EditPrivacyPolicy";

// import ResetPasswordSetting from "@/pages/dashboardpages/settings/ResetPasswordSetting";
// import TermsAndConditions from "@/pages/dashboardpages/settings/TermsAndConditions";
// import PrivacyPolicy from "@/pages/dashboardpages/settings/PrivacyPolicy";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/forgotpass",
    element: <ForgotPassword />,
  },
  {
    path: "/otpverification",
    element: <OTPVerification />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "notifications", element: <AllNotifications /> },
      { path: "users", element: <AllUsers /> },
      { path: "payments", element: <Payments /> },
      { path: "subscriptions", element: <Subscriptions /> },
      { path: "promo-codes", element: <PromoCodes /> },
      { path: "support", element: <Support /> },

      // // ✅ Settings Dropdown Routes
      { path: "settings/faq", element: <FAQ /> },
      { path: "settings/reset-password", element: <ResetPasswordSetting /> },
      { path: "settings/terms", element: <TermsAndConditions /> },
      { path: "settings/editterms", element: <EditTermsAndConditions /> },
      { path: "settings/privacy", element: <PrivacyPolicy /> },
      { path: "settings/editprivacy", element: <EditPrivacyPolicy /> },
    ],
  },
]);

export default routes;
