import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  CreditCard,
  Link,
} from "lucide-react";

// Mock payment data
const mockPayments = [
  {
    id: 1,
    invoiceNumber: "50682",
    transactionId: "TIB7854ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19552",
    subscription: "Monthly",
    paymentStatus: "Paid",
  },
  {
    id: 2,
    invoiceNumber: "50683",
    transactionId: "TIB7855ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19553",
    subscription: "Monthly",
    paymentStatus: "Paid",
  },
  {
    id: 3,
    invoiceNumber: "50684",
    transactionId: "TIB7856ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19554",
    subscription: "Monthly",
    paymentStatus: "Paid",
  },
  {
    id: 4,
    invoiceNumber: "50685",
    transactionId: "TIB7857ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19555",
    subscription: "Yearly",
    paymentStatus: "Paid",
  },
  {
    id: 5,
    invoiceNumber: "50686",
    transactionId: "TIB7858ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19556",
    subscription: "Yearly",
    paymentStatus: "Renewed",
  },
  {
    id: 6,
    invoiceNumber: "50687",
    transactionId: "TIB7859ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19557",
    subscription: "Yearly",
    paymentStatus: "Paid",
  },
  {
    id: 7,
    invoiceNumber: "50688",
    transactionId: "TIB7860ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19558",
    subscription: "Monthly",
    paymentStatus: "Renewed",
  },
  {
    id: 8,
    invoiceNumber: "50689",
    transactionId: "TIB7861ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19559",
    subscription: "Monthly",
    paymentStatus: "Paid",
  },
  {
    id: 9,
    invoiceNumber: "50690",
    transactionId: "TIB7862ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19560",
    subscription: "Yearly",
    paymentStatus: "Paid",
  },
  {
    id: 10,
    invoiceNumber: "50691",
    transactionId: "TIB7863ULB",
    paymentDate: "2025-07-05",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19561",
    subscription: "Monthly",
    paymentStatus: "Renewed",
  },
  {
    id: 11,
    invoiceNumber: "50692",
    transactionId: "TIB7864ULB",
    paymentDate: "2025-07-04",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19562",
    subscription: "Yearly",
    paymentStatus: "Paid",
  },
  {
    id: 12,
    invoiceNumber: "50693",
    transactionId: "TIB7865ULB",
    paymentDate: "2025-07-04",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19563",
    subscription: "Monthly",
    paymentStatus: "Paid",
  },
  {
    id: 13,
    invoiceNumber: "50694",
    transactionId: "TIB7866ULB",
    paymentDate: "2025-07-03",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19564",
    subscription: "Monthly",
    paymentStatus: "Paid",
  },
  {
    id: 14,
    invoiceNumber: "50695",
    transactionId: "TIB7867ULB",
    paymentDate: "2025-07-03",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19565",
    subscription: "Yearly",
    paymentStatus: "Renewed",
  },
  {
    id: 15,
    invoiceNumber: "50696",
    transactionId: "TIB7868ULB",
    paymentDate: "2025-07-02",
    amount: 58.0,
    paymentMethod: "Stripe",
    userId: "19566",
    subscription: "Monthly",
    paymentStatus: "Paid",
  },
];

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptionFilter, setSubscriptionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [customDateFrom, setCustomDateFrom] = useState();
  const [customDateTo, setCustomDateTo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const filteredPayments = useMemo(() => {
    return mockPayments.filter((payment) => {
      const matchesSearch =
        payment.invoiceNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.transactionId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSubscription =
        subscriptionFilter === "all" ||
        payment.subscription.toLowerCase() === subscriptionFilter.toLowerCase();
      const matchesStatus =
        statusFilter === "all" ||
        payment.paymentStatus.toLowerCase() === statusFilter.toLowerCase();

      let matchesTime = true;
      if (timeFilter !== "all") {
        const paymentDate = new Date(payment.paymentDate);
        const now = new Date();

        switch (timeFilter) {
          case "1day":
            matchesTime =
              now.getTime() - paymentDate.getTime() <= 24 * 60 * 60 * 1000;
            break;
          case "7days":
            matchesTime =
              now.getTime() - paymentDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
            break;
          case "1month":
            matchesTime =
              now.getTime() - paymentDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
            break;
          case "custom":
            if (customDateFrom && customDateTo) {
              matchesTime =
                paymentDate >= customDateFrom && paymentDate <= customDateTo;
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
    customDateFrom,
    customDateTo,
  ]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = filteredPayments.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getSubscriptionBadgeColor = (subscription) => {
    switch (subscription.toLowerCase()) {
      case "monthly":
        return "bg-orange-100 text-[#F3934F] hover:bg-orange-200 rounded-full";
      case "yearly":
        return "bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full";
      default:
        return "bg-gray-50 text-gray-300 hover:bg-gray-200 border-[1px] rounded-full";
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "border-[1px] bg-green-300 text-white rounded-full";
      case "renewed":
        return "bg-[#D9EFFC] text-[#1593E5] hover:bg-blue-200 rounded-full";
      default:
        return "bg-gray-100 text-gray-400 hover:bg-gray-200 border-[1px] rounded-full";
    }
  };

  return (
    <div className=" mx-auto  space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">Payments</h1>
        </div>
      </div>

      <Card className="rounded-lg">
        <CardContent className="">
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
                  <SelectItem value="1day">1 Day</SelectItem>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              {timeFilter === "custom" && (
                <>
                  <Input
                    type="date"
                    value={
                      customDateFrom
                        ? customDateFrom.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setCustomDateFrom(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                    className="w-[150px]"
                  />
                  <Input
                    type="date"
                    value={
                      customDateTo
                        ? customDateTo.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setCustomDateTo(
                        e.target.value ? new Date(e.target.value) : undefined
                      )
                    }
                    className="w-[150px]"
                  />
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Invoice Number</TableHead>
                <TableHead className="text-center">Transaction ID</TableHead>
                <TableHead className="text-center">Payment Date</TableHead>
                <TableHead className="text-center">Amounts</TableHead>
                <TableHead className="text-center">Payment Method</TableHead>
                <TableHead className="text-center">User ID</TableHead>
                <TableHead className="text-center">Subscription</TableHead>
                <TableHead className="text-center">Payment Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium text-center">
                    {payment.invoiceNumber}
                  </TableCell>
                  <TableCell className="text-center">
                    {payment.transactionId}
                  </TableCell>
                  <TableCell className="text-center">
                    {payment.paymentDate}
                  </TableCell>
                  <TableCell className="text-center">
                    €{payment.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    {payment.paymentMethod}
                  </TableCell>
                  <TableCell className="text-center">
                    {payment.userId}
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
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredPayments.length)} of{" "}
          {filteredPayments.length} payments
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
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
