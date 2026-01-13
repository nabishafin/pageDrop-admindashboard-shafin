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
import { useGetAllPaymentsQuery } from "@/redux/features/payment/paymentApi";
import CustomLoading from "@/components/ui/CustomLoading";

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [activeTimeRange, setActiveTimeRange] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const itemsPerPage = 10;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Update activeTimeRange based on filters
  useEffect(() => {
    if (timeFilter === "custom") {
      if (customStartDate && customEndDate) {
        setActiveTimeRange(`${customStartDate}_${customEndDate}`);
      }
    } else {
      setActiveTimeRange(timeFilter);
    }
  }, [timeFilter, customStartDate, customEndDate]);

  // Reset to first page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearch,
    subscriptionFilter,
    statusFilter,
    activeTimeRange,
  ]);

  const getQueryParams = () => {
    const baseParams = {
      page: currentPage,
      limit: itemsPerPage,
      search: debouncedSearch,
      subscription: subscriptionFilter,
      paymentStatus: statusFilter,
    };

    if (activeTimeRange.includes("_")) {
      const activeSplit = activeTimeRange.split("_");
      return {
        ...baseParams,
        timeRange: "custom",
        startDate: activeSplit[0],
        endDate: activeSplit[1],
      };
    }

    return {
      ...baseParams,
      timeRange: activeTimeRange,
    };
  };

  const queryParams = getQueryParams();

  // Fetch payments with RTK Query
  const { data, isLoading, isFetching, error } =
    useGetAllPaymentsQuery(queryParams);

  // Extract data from response
  const payments = data?.data || [];
  const totalPayments = data?.pagination?.totalItems || 0;
  const totalPages = data?.pagination?.totalPages || 1;

  const getSubscriptionBadgeColor = (subscription) => {
    switch (subscription.toLowerCase()) {
      case "monthly":
        return "border-[1px] border-orange-400 text-orange-400 bg-white rounded-full";
      case "yearly":
        return "border-[1px] border-blue-400 text-blue-400 bg-white rounded-full px-4";
      default:
        return "border-[1px] border-gray-500 text-gray-500 bg-white rounded-full";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "border-[1px] border-green-500 text-green-500 bg-white rounded-full px-6";
      case "renewed":
        return "border-[1px] border-[#1593E5] text-[#1593E5] bg-white rounded-full";
      default:
        return "border-[1px] border-gray-400 text-gray-400 hover:bg-gray-200 rounded-full";
    }
  };

  // Pagination component
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
          className={`w-8 h-8 p-0 ${currentPage === i ? "bg-[#4FB2F3] hover:bg-[#4FB2F3]" : ""
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
    <div className=" mx-auto  space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Payments</h1>
        </div>
      </div>

      <Card className="rounded-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Invoice, Transaction ID, User ID..."
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
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Subscription" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscriptions</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="renewed">Renewed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
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

      <Card className="rounded-lg">
        <CardContent className="p-0">
          {isLoading ? (
            <CustomLoading />
          ) : error ? (
            <div className="flex items-center justify-center py-20 text-red-500">
              Error loading payments. Please try again.
            </div>
          ) : payments.length === 0 ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              No payments found matching your criteria
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
                    <TableHead className="text-center">
                      Invoice Number
                    </TableHead>
                    <TableHead className="text-center">
                      Transaction ID
                    </TableHead>
                    <TableHead className="text-center">Payment Date</TableHead>
                    <TableHead className="text-center">Amounts</TableHead>
                    <TableHead className="text-center">
                      Payment Method
                    </TableHead>
                    <TableHead className="text-center">User ID</TableHead>
                    <TableHead className="text-center">Subscription</TableHead>
                    <TableHead className="text-center">
                      Payment Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment._id}>
                      <TableCell className="font-medium text-center">
                        {payment.invoiceNumber}
                      </TableCell>
                      <TableCell className="text-center">
                        {payment.transactionID}
                      </TableCell>
                      <TableCell className="text-center">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        €{payment.amounts.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center">
                        {payment.paymentMethod}
                      </TableCell>
                      <TableCell className="text-center">
                        {payment.userID}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="secondary"
                          className={getSubscriptionBadgeColor(
                            payment.subscription
                          )}
                        >
                          {payment.subscription}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="secondary"
                          className={getStatusBadgeColor(payment.paymentStatus)}
                        >
                          {payment.paymentStatus}
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

      {!isLoading && payments.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, totalPayments)} of{" "}
            {totalPayments} payments
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || isFetching}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
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
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
