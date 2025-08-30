import { useState, useMemo } from "react";
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
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

// Mock user data
const mockUsers = [
  {
    id: "94521",
    name: "User name",
    email: "user@example.com",
    contact: "(555) 555-0107",
    joined: "3 Jul, 2024",
    startDate: "3 Jul, 2024",
    subscription: "Monthly",
    endDate: "3 Aug, 2024",
    status: "Active",
  },
  {
    id: "94522",
    name: "User name",
    email: "user2@example.com",
    contact: "(555) 555-0108",
    joined: "5 Jul, 2024",
    startDate: "5 Jul, 2024",
    subscription: "Yearly",
    endDate: "5 Jul, 2025",
    status: "Active",
  },
  {
    id: "94523",
    name: "User name",
    email: "user3@example.com",
    contact: "(555) 555-0109",
    joined: "8 Jul, 2024",
    startDate: "8 Jul, 2024",
    subscription: "Monthly",
    endDate: "8 Aug, 2024",
    status: "Inactive",
  },
  {
    id: "94524",
    name: "User name",
    email: "user4@example.com",
    contact: "(555) 555-0110",
    joined: "10 Jul, 2024",
    startDate: "10 Jul, 2024",
    subscription: "Yearly",
    endDate: "10 Jul, 2025",
    status: "Active",
  },
  {
    id: "94525",
    name: "User name",
    email: "user5@example.com",
    contact: "(555) 555-0111",
    joined: "12 Jul, 2024",
    startDate: "12 Jul, 2024",
    subscription: "Monthly",
    endDate: "12 Aug, 2024",
    status: "Inactive",
  },
  // Add more mock users to demonstrate pagination
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `9452${6 + i}`,
    name: "User name",
    email: `user${6 + i}@example.com`,
    contact: `(555) 555-${String(112 + i).padStart(4, "0")}`,
    joined: `${15 + (i % 15)} Jul, 2024`,
    startDate: `${15 + (i % 15)} Jul, 2024`,
    subscription: i % 3 === 0 ? "Yearly" : "Monthly",
    endDate:
      i % 3 === 0 ? `${15 + (i % 15)} Jul, 2025` : `${15 + (i % 15)} Aug, 2024`,
    status: i % 4 === 0 ? "Inactive" : "Active",
  })),
];

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 11;

  // Filter users based on all criteria
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      // Search filter
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contact.includes(searchTerm);

      // Subscription filter
      const matchesSubscription =
        subscriptionFilter === "all" ||
        user.subscription.toLowerCase() === subscriptionFilter;

      // Status filter
      const matchesStatus =
        statusFilter === "all" || user.status.toLowerCase() === statusFilter;

      // Time filter
      let matchesTime = true;
      if (timeFilter !== "all") {
        const userJoinedDate = new Date(user.joined);
        const now = new Date();

        switch (timeFilter) {
          case "1day":
            matchesTime =
              now.getTime() - userJoinedDate.getTime() <= 24 * 60 * 60 * 1000;
            break;
          case "7days":
            matchesTime =
              now.getTime() - userJoinedDate.getTime() <=
              7 * 24 * 60 * 60 * 1000;
            break;
          case "1month":
            matchesTime =
              now.getTime() - userJoinedDate.getTime() <=
              30 * 24 * 60 * 60 * 1000;
            break;
          case "custom":
            if (customStartDate && customEndDate) {
              const startDate = new Date(customStartDate);
              const endDate = new Date(customEndDate);
              matchesTime =
                userJoinedDate >= startDate && userJoinedDate <= endDate;
            }
            break;
        }
      }

      return (
        matchesSearch && matchesSubscription && matchesStatus && matchesTime
      );
    });
  }, [
    searchTerm,
    subscriptionFilter,
    statusFilter,
    timeFilter,
    customStartDate,
    customEndDate,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const getStatusBadgeVariant = (status) => {
    return status === "Active" ? "default" : "secondary";
  };

  const getSubscriptionBadgeVariant = (subscription) => {
    return subscription === "Monthly" ? "default" : "destructive";
  };

  return (
    <div className=" mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>

      {/* Search and Filters */}
      <Card className="rounded-lg">
        <CardContent className="">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Name All Users"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4">
              {/* Subscription Filter */}
              <Select
                value={subscriptionFilter}
                onValueChange={setSubscriptionFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Subscription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscriptions</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* Time Filter */}
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="1day">1 Day</SelectItem>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              {/* Custom Date Range */}
              {timeFilter === "custom" && (
                <>
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
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">User ID</TableHead>
                <TableHead className="text-center">User name</TableHead>
                <TableHead className="text-center">Contact</TableHead>
                <TableHead className="text-center">Contact</TableHead>
                <TableHead className="text-center">Joined</TableHead>
                <TableHead className="text-center">Start Date</TableHead>
                <TableHead className="text-center">Subscription</TableHead>
                <TableHead className="text-center">End Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-center">
                    {user.id}
                  </TableCell>
                  <TableCell className="text-center">{user.name}</TableCell>
                  <TableCell className="text-center">{user.email}</TableCell>
                  <TableCell className="text-center">{user.contact}</TableCell>
                  <TableCell className="text-center">{user.joined}</TableCell>
                  <TableCell className="text-center">
                    {user.startDate}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={getSubscriptionBadgeVariant(user.subscription)}
                      className={
                        user.subscription === "Monthly"
                          ? "bg-[#D9EFFC] text-[#1593E5] hover:bg-blue-200 rounded-full"
                          : "bg-orange-100 text-[#F3934F] hover:bg-orange-200 rounded-full"
                      }
                    >
                      {user.subscription}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{user.endDate}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={getStatusBadgeVariant(user.status)}
                      className={
                        user.status === "Active"
                          ? "bg-white border-[1px] border-green-300 text-green-300 rounded-full"
                          : "bg-white border-[1px] b border-red-300 text-red-300 rounded-full"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 " />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-8 h-8 p-0 bg-[#4FB2F3] hover:bg-[#4FB2F3]"
                >
                  {pageNum}
                </Button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span className="text-muted-foreground">...</span>
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  className="w-8 h-8 p-0 bg-[#4FB2F3] hover:bg-[#4FB2F3]"
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
