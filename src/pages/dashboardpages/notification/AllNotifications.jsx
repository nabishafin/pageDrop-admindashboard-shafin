import { useState } from "react";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  // Mock notifications data
  const notifications = [
    {
      id: "1",
      message: "A host are register Now",
      time: "Fri 12:00pm",
      isRead: false,
    },
    {
      id: "2",
      message: "An user joined in app",
      time: "Fri 12:30pm",
      isRead: false,
    },
    {
      id: "3",
      message: "An user joined in app",
      time: "Fri 12:30pm",
      isRead: false,
    },
    {
      id: "4",
      message: "An user joined in app",
      time: "Fri 12:30pm",
      isRead: false,
    },
    {
      id: "5",
      message: "New booking received",
      time: "Thu 11:45am",
      isRead: true,
    },
    {
      id: "6",
      message: "Payment completed successfully",
      time: "Thu 10:30am",
      isRead: true,
    },
    {
      id: "7",
      message: "User profile updated",
      time: "Wed 3:15pm",
      isRead: true,
    },
    {
      id: "8",
      message: "New review submitted",
      time: "Wed 2:00pm",
      isRead: true,
    },
    {
      id: "9",
      message: "System maintenance scheduled",
      time: "Tue 9:00am",
      isRead: true,
    },
    { id: "10", message: "Security alert", time: "Mon 4:30pm", isRead: true },
    {
      id: "11",
      message: "Database backup completed",
      time: "Mon 2:00am",
      isRead: true,
    },
    {
      id: "12",
      message: "New feature released",
      time: "Sun 6:00pm",
      isRead: true,
    },
    {
      id: "13",
      message: "Server update completed",
      time: "Sat 11:00pm",
      isRead: true,
    },
    {
      id: "14",
      message: "Weekly report generated",
      time: "Sat 9:00am",
      isRead: true,
    },
    {
      id: "15",
      message: "User feedback received",
      time: "Fri 5:30pm",
      isRead: true,
    },
  ];

  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = notifications.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(i)}
            className={
              currentPage === i
                ? "bg-[#4FB2F3] hover:bg-[#4FB2F3]/90 text-white"
                : ""
            }
          >
            {i}
          </Button>
        );
      }
    } else {
      for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(i)}
            className={
              currentPage === i
                ? "bg-[#4FB2F3] hover:bg-[#4FB2F3]/90 text-white"
                : ""
            }
          >
            {i}
          </Button>
        );
      }

      if (totalPages > maxVisiblePages) {
        pages.push(
          <span key="ellipsis" className="px-2 text-muted-foreground">
            ...
          </span>
        );
        pages.push(
          <Button
            key={totalPages}
            variant={currentPage === totalPages ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            className={
              currentPage === totalPages
                ? "bg-[#4FB2F3] hover:bg-[#4FB2F3]/90 text-white"
                : ""
            }
          >
            {totalPages}
          </Button>
        );
      }
    }

    return pages;
  };

  return (
    <div className=" mx-auto">
      {/* Header */}
      <div className="bg-[#4FB2F3] text-white px-4 py-3 rounded-t-lg">
        <h1 className="text-lg font-semibold"> All Notifications</h1>
      </div>

      {/* Notifications List */}
      <div className=" border border-t-0 rounded-b-lg">
        <div className="divide-y divide-gray-100">
          {currentNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50"
            >
              <div className="flex-shrink-0">
                <Bell className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{notification.message}</p>
                <p className="text-xs text-[#1593E5] mt-1">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, notifications.length)} of {notifications.length}{" "}
            notifications
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {renderPageNumbers()}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
