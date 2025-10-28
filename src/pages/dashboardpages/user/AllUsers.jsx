import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useGetUsersQuery } from "@/redux/features/user/userApi";

export default function AllUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const usersPerPage = 10;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    subscriptionFilter,
    statusFilter,
    timeFilter,
    customStartDate,
    customEndDate,
  ]);

  const buildTimeRange = () => {
    if (timeFilter === "custom" && customStartDate && customEndDate) {
      return `${customStartDate}_${customEndDate}`;
    }
    return timeFilter;
  };

  const queryParams = {
    page: currentPage,
    limit: usersPerPage,
    search: debouncedSearch,
    status: statusFilter,
    subscription: subscriptionFilter,
    timeRange: buildTimeRange(),
  };

  const {
    data,
    isLoading,
    isFetching,
    error: queryError,
  } = useGetUsersQuery(queryParams);

  const users = data?.data?.users || [];
  const totalUsers = data?.data?.totalUsers || 0;
  const totalPages = data?.data?.totalPages || 1;

  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A" || dateString === "null")
      return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  const getStatusDisplay = (status) => {
    if (!status || status === "Incomplete") return "Incomplete";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const getSubscriptionDisplay = (type) => {
    if (!type || type === "None") return "None";
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={isFetching}
          className="w-8 h-8 p-0"
        >
          1
        </Button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 text-muted-foreground">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(i)}
          disabled={isFetching}
          className={`w-8 h-8 p-0 ${
            currentPage === i ? "bg-[#4FB2F3] hover:bg-[#4FB2F3]" : ""
          }`}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 text-muted-foreground">
            ...
          </span>
        );
      }
      buttons.push(
        <Button
          key={totalPages}
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={isFetching}
          className="w-8 h-8 p-0"
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>

      {/* Filters Card */}
      <Card className="rounded-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Name, Email, or Contact"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <Select
                value={subscriptionFilter}
                onValueChange={setSubscriptionFilter}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Subscription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscriptions</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="incomplete">Incomplete</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="day">1 Day</SelectItem>
                  <SelectItem value="week">7 Days</SelectItem>
                  <SelectItem value="month">1 Month</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              {timeFilter === "custom" && (
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-[150px]"
                  />
                  <Input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-[150px]"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table Card */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-[#4FB2F3]" />
              <span className="ml-2">Loading users...</span>
            </div>
          ) : queryError ? (
            <div className="flex items-center justify-center py-20 text-red-500">
              Error loading users. Please try again.
            </div>
          ) : users.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              No data
            </div>
          ) : (
            <div className="relative">
              {isFetching && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10 rounded-lg">
                  <Loader2 className="h-6 w-6 animate-spin text-[#4FB2F3]" />
                </div>
              )}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Full Name</TableHead>
                    <TableHead className="text-center">Email</TableHead>
                    <TableHead className="text-center">Phone</TableHead>
                    <TableHead className="text-center">Joining Date</TableHead>
                    <TableHead className="text-center">Start Date</TableHead>
                    <TableHead className="text-center">Subscription</TableHead>
                    <TableHead className="text-center">End Date</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">
                        {user.fullName || "N/A"}
                      </TableCell>
                      <TableCell className="text-center">
                        {user.email || "N/A"}
                      </TableCell>
                      <TableCell className="text-center">
                        {user.phone || "N/A"}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatDate(user.joiningDate)}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatDate(user.subscriptionStartDate)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`rounded-full px-3 py-1 ${
                            user.subscriptionType === "monthly"
                              ? "border-[#1593E5] text-[#1593E5]"
                              : user.subscriptionType === "yearly"
                              ? "border-[#F3934F] text-[#F3934F]"
                              : "border-gray-400 text-gray-400"
                          }`}
                        >
                          {getSubscriptionDisplay(user.subscriptionType)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {formatDate(user.subscriptionEndDate)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={`rounded-full px-3 py-1 ${
                            user.userStatus === "active"
                              ? "border-green-500 text-green-500"
                              : user.userStatus === "incomplete" ||
                                user.userStatus === "Incomplete"
                              ? "border-yellow-500 text-yellow-500"
                              : "border-red-500 text-red-500"
                          }`}
                        >
                          {getStatusDisplay(user.userStatus)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {!isLoading && users.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
            {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers}{" "}
            users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isFetching}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>

            <div className="flex items-center gap-1">
              {renderPaginationButtons()}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || isFetching}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
