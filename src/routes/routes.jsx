import { createBrowserRouter } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import SignInPage from "../pages/auth/SignInPage";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OTPVerification from "../pages/auth/OTPVerification";
import ResetPassword from "../pages/auth/ResetPassword";

// Dashboard Pages
import DashboardOverview from "../pages/dashboardpages/DashboardOverview/DashboardOverview";
import AllNotifications from "../pages/dashboardpages/notification/AllNotifications";
import AllUsers from "../pages/dashboardpages/user/AllUsers";
// import Payments from "../pages/dashboardpages/payments/Payments";
// import Subscriptions from "../pages/dashboardpages/subscriptions/Subscriptions";
// import PromoCodes from "../pages/dashboardpages/promocodes/PromoCodes";
// import Support from "../pages/dashboardpages/support/Support";

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
      // { path: "payments", element: <Payments /> },
      // { path: "subscriptions", element: <Subscriptions /> },
      // { path: "promo-codes", element: <PromoCodes /> },
      // { path: "support", element: <Support /> },
    ],
  },
]);

export default routes;
