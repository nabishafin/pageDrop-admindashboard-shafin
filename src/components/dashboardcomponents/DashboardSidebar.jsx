import {
  LayoutDashboard,
  Users2,
  Settings,
  UserCog,
  Info,
  FileText,
  ScrollText,
  LogOut,
  ChevronRight,
  ChevronDown,
  Menu,
  Music,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Sidebar Items
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
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    children: [
      {
        title: "Profile",
        href: "/dashboard/settings/profile",
        icon: UserCog,
      },
      {
        title: "Terms & Condition",
        href: "/dashboard/settings/terms",
        icon: ScrollText,
      },
      {
        title: "Privacy Policy",
        href: "/dashboard/settings/privacy",
        icon: FileText,
      },
      {
        title: "About Us",
        href: "/dashboard/settings/about",
        icon: Info,
      },
    ],
  },
];

// Logo Section
function LogoSection({ name = "Dance Attix", title = "Admin Panel" }) {
  return (
    <Link to="/dashboard">
      <div className="flex items-center p-4 sm:p-6 flex-col justify-center">
        <img src="/logo.svg" alt="logo" className="w-8 h-8 sm:w-10 sm:h-10" />
        <h1 className="text-xl sm:text-2xl font-bold mt-2">{name}</h1>
        <p className="text-xs sm:text-sm mt-1">{title}</p>
      </div>
    </Link>
  );
}

// Sidebar Navigation List
function SidebarNav({ onLinkClick, isMobile = false }) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpanded = (href) =>
    setExpandedItems((prev) =>
      prev.includes(href) ? prev.filter((i) => i !== href) : [...prev, href]
    );

  const isExpanded = (href) => expandedItems.includes(href);

  return (
    <nav className="flex-1 p-2 sm:p-4 overflow-y-auto flex flex-col">
      <ul className="space-y-1 sm:space-y-2 flex-1">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          const hasChildren = !!item.children?.length;
          const expanded = isExpanded(item.href);

          return (
            <li key={item.href}>
              {hasChildren ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => toggleExpanded(item.href)}
                    className={cn(
                      "w-full justify-start gap-2 h-8 sm:h-10 text-sm sm:text-base",
                      isActive
                        ? "bg-teal-50 text-[#017783] hover:bg-teal-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {expanded ? (
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                    ) : (
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                  <div
                    className={cn(
                      "transition-all overflow-hidden duration-200 ml-3 sm:ml-4",
                      expanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <ul className="space-y-1 mt-1 sm:mt-2">
                      {item.children.map((child) => {
                        const isChildActive = location.pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link to={child.href} onClick={onLinkClick}>
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-2 h-7 sm:h-9 text-xs sm:text-sm",
                                  isChildActive
                                    ? "bg-white text-[#017783]"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                )}
                              >
                                <child.icon className="h-3 w-3" />
                                {child.title}
                              </Button>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                <Link to={item.href} onClick={onLinkClick}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-2 h-8 sm:h-10 text-sm sm:text-base",
                      isActive
                        ? "bg-white text-[#017783]"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                    {item.title}
                  </Button>
                </Link>
              )}
            </li>
          );
        })}
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
    <div className="hidden lg:flex h-full w-64 flex-col bg-[#E8E8E8] border-r border-gray-200">
      <LogoSection />
      <SidebarNav />
    </div>
  );
}

// Mobile Sidebar - Fixed burger button styling
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
              <div className="bg-teal-600 p-1 sm:p-2 rounded-lg">
                <Music className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Dance Attix
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

// Export individual components
export { DesktopSidebar, MobileSidebar };

// Export Combined Sidebar (only for desktop use)
export default function DashboardSidebar() {
  return <DesktopSidebar />;
}