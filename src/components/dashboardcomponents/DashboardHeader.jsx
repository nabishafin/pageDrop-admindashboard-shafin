import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search, LogOut, User, Settings, Star } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MobileSidebar } from "./DashboardSidebar";

// Route names mapping
const routeNames = {
  "/dashboard": "Dashboard Overview",
  "/dashboard/users": "Users Management",
  "/dashboard/user-management": "User Management",
  "/dashboard/notifications": "Notifications",
  "/dashboard/payments": "Payments",
  "/dashboard/subscriptions": "Subscriptions",
  "/dashboard/promo-codes": "Promo Codes",
  "/dashboard/support": "Support",
};
// Dynamic breadcrumb function
const getBreadcrumb = (pathname) => {
  // Exact match check করুন
  if (routeNames[pathname]) {
    return routeNames[pathname];
  }

  // Fallback: path থেকে name generate করুন
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 1 && segments[0] === "dashboard") {
    return "Dashboard Overview";
  }

  if (segments.length > 1) {
    const lastSegment = segments[segments.length - 1];
    // Convert kebab-case to Title Case
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return "Dashboard";
};

export default function DashboardHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // Current route name পেতে
  const currentPageName = getBreadcrumb(location.pathname);

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <header className="bg-[#FFFFFF] text-black px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden">
            <MobileSidebar />
          </div>
          <div className="">
            <h1 className="text-lg sm:text-xl">
              <span className="hidden sm:inline font-semibold text-gray-400 text-sm">
                <Star className="inline mr-1 text-gray-500 text-sm mb-1" />{" "}
                Dashboard /{" "}
              </span>
              <span className="hidden sm:inline text-[15px] text-[#1593E5]">
                {currentPageName}
              </span>

              {/* Mobile */}
              <span className="sm:hidden font-semibold text-sm text-gray-400">
                <Star className="inline mr-1 text-gray-500" /> Dashboard /
              </span>
              <span className="sm:hidden font-bold text-lg text-[#017783]">
                {currentPageName.split(" ")[0]}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          <Link to={"/dashboard/notifications"}>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full relative h-8 w-8 sm:h-10 sm:w-10 transition-colors"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
