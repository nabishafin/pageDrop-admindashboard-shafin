import {
  LayoutDashboard,
  Users2,
  CreditCard,
  Calendar,
  TicketPercent,
  Headphones,
  LogOut,
  Menu,
  Settings as SettingsIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "../../assets/LegierGlobalIcon.jpg";

// Sidebar Items (except settings)
const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users2,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Subscriptions",
    href: "/dashboard/subscriptions",
    icon: Calendar,
  },
  {
    title: "Promo Codes",
    href: "/dashboard/promo-codes",
    icon: TicketPercent,
  },
  {
    title: "Support",
    href: "/dashboard/support",
    icon: Headphones,
  },
];

// Settings Sub Routes
const settingsSubItems = [
  { title: "FAQ", href: "/dashboard/settings/faq" },
  { title: "Reset Password", href: "/dashboard/settings/reset-password" },
  { title: "Terms & Conditions", href: "/dashboard/settings/terms" },
  { title: "Privacy Policy", href: "/dashboard/settings/privacy" },
];

// Logo Section
function LogoSection({ name = "Dance Attix", title = "Admin Panel" }) {
  return (
    <Link to="/dashboard">
      <div className="flex items-center p-4 sm:p-6 gap-2 justify-center">
        <img src={logo} alt="logo" className="w-8 h-8 sm:w-10 sm:h-10" />
        <h1 className="text-2xl sm:text-2xl font-bold ">Legier Global</h1>
      </div>
    </Link>
  );
}

// Sidebar Navigation List
function SidebarNav({ onLinkClick, isMobile = false }) {
  const location = useLocation();
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <nav className="flex-1 p-2 sm:p-4 overflow-y-auto flex flex-col">
      <ul className="space-y-1 sm:space-y-2 flex-1">
        {/* Normal Sidebar Items */}
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;

          return (
            <li key={item.href}>
              <Link to={item.href} onClick={onLinkClick}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 h-8 sm:h-10 text-sm sm:text-base hover:bg-none",
                    isActive ? "bg-[#D9EFFC] text-[#1593E5]" : "text-gray-600"
                  )}
                >
                  <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                  {item.title}
                </Button>
              </Link>
            </li>
          );
        })}

        {/* Settings with Dropdown */}
        <li>
          <Button
            variant="ghost"
            onClick={() => setOpenSettings(!openSettings)}
            className={cn(
              "w-full justify-between gap-2 h-8 sm:h-10 text-sm sm:text-base hover:bg-none",
              location.pathname.includes("/dashboard/settings")
                ? "bg-[#D9EFFC] text-[#1593E5]"
                : "text-gray-600"
            )}
          >
            <span className="flex items-center gap-2">
              <SettingsIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              Settings
            </span>
            <span>{openSettings ? "▲" : "▼"}</span>
          </Button>

          {openSettings && (
            <ul className="ml-6 mt-1 space-y-1">
              {settingsSubItems.map((sub) => {
                const isActive = location.pathname === sub.href;
                return (
                  <li key={sub.href}>
                    <Link to={sub.href} onClick={onLinkClick}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-2 h-8 sm:h-9 text-xs sm:text-sm hover:bg-none",
                          isActive
                            ? "bg-[#E6F6FF] text-[#1593E5]"
                            : "text-gray-500"
                        )}
                      >
                        {sub.title}
                      </Button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      </ul>

      {/* Logout button at the bottom */}
      <div className="mt-auto p-2 sm:p-4 border-t border-gray-200">
        <Link to="/logout" onClick={onLinkClick}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 h-8 sm:h-10 text-sm sm:text-base",
              "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            Logout
          </Button>
        </Link>
      </div>
    </nav>
  );
}

// Desktop Sidebar
function DesktopSidebar() {
  return (
    <div className="hidden lg:flex h-full w-64 flex-col bg-[#FFFFFF]">
      <LogoSection />
      <SidebarNav />
    </div>
  );
}

// Mobile Sidebar
function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-white/20 h-8 w-8 bg-transparent border border-white/20 transition-colors"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 sm:max-w-sm">
        <div className="flex h-full flex-col bg-white">
          {/* Mobile Logo */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Legier Global
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>
          <SidebarNav onLinkClick={() => setOpen(false)} isMobile={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Export
export { DesktopSidebar, MobileSidebar };

export default function DashboardSidebar() {
  return <DesktopSidebar />;
}
