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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const mockTickets = [
  {
    id: "STA-98374",
    subject: "App crash problem",
    description: "crash problem",
    reportDate: "5 Jul, 2025",
    userId: "19552",
    subscription: "Unresolved",
    solvedDate: null,
    status: "Unresolved",
  },
  {
    id: "STA-98375",
    subject: "Login issue",
    description: "Cannot login to account",
    reportDate: "6 Jul, 2025",
    userId: "19553",
    subscription: "Open",
    solvedDate: null,
    status: "Open",
  },
  {
    id: "STA-98376",
    subject: "Payment failed",
    description: "Payment processing error",
    reportDate: "7 Jul, 2025",
    userId: "19554",
    subscription: "Resolved",
    solvedDate: "8 Jul, 2025",
    status: "Resolved",
  },
  {
    id: "STA-98377",
    subject: "Feature request",
    description: "Need dark mode",
    reportDate: "8 Jul, 2025",
    userId: "19555",
    subscription: "Open",
    solvedDate: null,
    status: "Open",
  },
  {
    id: "STA-98378",
    subject: "Bug report",
    description: "UI alignment issue",
    reportDate: "9 Jul, 2025",
    userId: "19556",
    subscription: "Resolved",
    solvedDate: "10 Jul, 2025",
    status: "Resolved",
  },
  {
    id: "STA-98375",
    subject: "Login issue",
    description: "Cannot login to account",
    reportDate: "6 Jul, 2025",
    userId: "19553",
    subscription: "Open",
    solvedDate: null,
    status: "Open",
  },
  {
    id: "STA-98376",
    subject: "Payment failed",
    description: "Payment processing error",
    reportDate: "7 Jul, 2025",
    userId: "19554",
    subscription: "Resolved",
    solvedDate: "8 Jul, 2025",
    status: "Resolved",
  },
  {
    id: "STA-98377",
    subject: "Feature request",
    description: "Need dark mode",
    reportDate: "8 Jul, 2025",
    userId: "19555",
    subscription: "Open",
    solvedDate: null,
    status: "Open",
  },
  {
    id: "STA-98378",
    subject: "Bug report",
    description: "UI alignment issue",
    reportDate: "9 Jul, 2025",
    userId: "19556",
    subscription: "Resolved",
    solvedDate: "10 Jul, 2025",
    status: "Resolved",
  },
  {
    id: "STA-98375",
    subject: "Login issue",
    description: "Cannot login to account",
    reportDate: "6 Jul, 2025",
    userId: "19553",
    subscription: "Open",
    solvedDate: null,
    status: "Open",
  },
  {
    id: "STA-98376",
    subject: "Payment failed",
    description: "Payment processing error",
    reportDate: "7 Jul, 2025",
    userId: "19554",
    subscription: "Resolved",
    solvedDate: "8 Jul, 2025",
    status: "Resolved",
  },
  {
    id: "STA-98377",
    subject: "Feature request",
    description: "Need dark mode",
    reportDate: "8 Jul, 2025",
    userId: "19555",
    subscription: "Open",
    solvedDate: null,
    status: "Open",
  },
  {
    id: "STA-98378",
    subject: "Bug report",
    description: "UI alignment issue",
    reportDate: "9 Jul, 2025",
    userId: "19556",
    subscription: "Resolved",
    solvedDate: "10 Jul, 2025",
    status: "Resolved",
  },
  // Add more mock tickets if needed
];

export default function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ticketsPerPage = 9;

  const parseTicketDate = (dateStr) => {
    const [day, month, year] = dateStr.split(" ");
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    return new Date(
      Number.parseInt(year),
      monthMap[month.replace(",", "")],
      Number.parseInt(day)
    );
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Search filter
      const matchesSearch =
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.userId.includes(searchTerm);

      // Status filter
      const matchesStatus =
        statusFilter === "all" || ticket.status.toLowerCase() === statusFilter;

      let matchesTime = true;
      if (timeFilter !== "all") {
        const ticketDate = parseTicketDate(ticket.reportDate);
        const now = new Date();

        switch (timeFilter) {
          case "day":
            matchesTime =
              now.getTime() - ticketDate.getTime() <= 24 * 60 * 60 * 1000;
            break;
          case "week":
            matchesTime =
              now.getTime() - ticketDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
            break;
          case "month":
            matchesTime =
              now.getTime() - ticketDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
            break;
          case "custom":
            if (customStartDate && customEndDate) {
              const startDate = new Date(customStartDate);
              const endDate = new Date(customEndDate);
              endDate.setHours(23, 59, 59, 999); // Include the entire end date
              matchesTime = ticketDate >= startDate && ticketDate <= endDate;
            }
            break;
        }
      }

      if (customStartDate && customEndDate && timeFilter === "all") {
        const ticketDate = parseTicketDate(ticket.reportDate);
        const startDate = new Date(customStartDate);
        const endDate = new Date(customEndDate);
        endDate.setHours(23, 59, 59, 999);
        matchesTime = ticketDate >= startDate && ticketDate <= endDate;
      }

      return matchesSearch && matchesStatus && matchesTime;
    });
  }, [
    searchTerm,
    statusFilter,
    timeFilter,
    customStartDate,
    customEndDate,
    tickets,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = (currentPage - 1) * ticketsPerPage;
  const paginatedTickets = filteredTickets.slice(
    startIndex,
    startIndex + ticketsPerPage
  );

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Resolved":
        return "default";
      case "Open":
        return "secondary";
      case "Unresolved":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "border-[1px] border-blue-500 text-blue-500 0 rounded-full bg-white px-3";
      case "Open":
        return "border-[1px] border-orange-500 text-orange-500 bg-white rounded-full px-6";
      case "Unresolved":
        return "border-[1px] border-red-500 text-red-500 bg-white rounded-full ";
      default:
        return "rounded-full";
    }
  };

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: newStatus,
              subscription: newStatus,
              solvedDate:
                newStatus === "Resolved"
                  ? new Date().toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : null,
            }
          : ticket
      )
    );
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleStartDateChange = (date) => {
    setCustomStartDate(date);
    if (date && customEndDate) {
      setTimeFilter("custom");
    }
  };

  const handleEndDateChange = (date) => {
    setCustomEndDate(date);
    if (customStartDate && date) {
      setTimeFilter("custom");
    }
  };

  const handleTimeFilterChange = (value) => {
    setTimeFilter(value);
    if (value !== "custom") {
      setCustomStartDate("");
      setCustomEndDate("");
    }
  };

  return (
    <div className="mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Support</h1>
      </div>

      {/* Search and Filters */}
      <Card className="rounded-lg">
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by token ID, subject, description, or user ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4">
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unresolved">Unresolved</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              {/* Time Filter */}
              <Select value={timeFilter} onValueChange={handleTimeFilterChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="day">Last Day</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>

              {(timeFilter === "custom" ||
                customStartDate ||
                customEndDate) && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">From</span>
                    <Input
                      type="date"
                      value={customStartDate}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                      className="w-[150px]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">To</span>
                    <Input
                      type="date"
                      value={customEndDate}
                      onChange={(e) => handleEndDateChange(e.target.value)}
                      className="w-[150px]"
                    />
                  </div>
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
                <TableHead className="text-center">Support Token</TableHead>
                <TableHead className="text-start">Subject</TableHead>
                <TableHead className="text-center">Report Date</TableHead>
                <TableHead className="text-center">User ID</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Solved Date</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium text-center text-[#1593E5]">
                    {ticket.id}
                  </TableCell>
                  <TableCell className="text-start">{ticket.subject}</TableCell>
                  <TableCell className="text-center">
                    {ticket.reportDate}
                  </TableCell>
                  <TableCell className="text-center">{ticket.userId}</TableCell>
                  <TableCell className="text-center">
                    <Select
                      value={ticket.status}
                      onValueChange={(newStatus) =>
                        handleStatusChange(ticket.id, newStatus)
                      }
                    >
                      <SelectTrigger className="w-[120px] mx-auto border-none shadow-none p-1">
                        <SelectValue asChild>
                          <Badge
                            variant={getStatusBadgeVariant(ticket.status)}
                            className={getStatusBadgeStyle(ticket.status)}
                          >
                            {ticket.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Unresolved">
                          <Badge className="bg-white text-red-500 rounded-full border-red-500 ">
                            Unresolved
                          </Badge>
                        </SelectItem>
                        <SelectItem value="Open">
                          <Badge className="bg-white text-orange-500 rounded-full border-orange-500 px-6">
                            Open
                          </Badge>
                        </SelectItem>
                        <SelectItem value="Resolved">
                          <Badge className="bg-white text-blue-500 border-blue-500 rounded-full px-4">
                            Resolved
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center">
                    {ticket.solvedDate || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewTicket(ticket)}
                      className="border-none bg-none shadow-none"
                    >
                      <Eye />
                    </Button>
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
          {Math.min(startIndex + ticketsPerPage, filteredTickets.length)} of{" "}
          {filteredTickets.length} items
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

      {/* Modal for viewing ticket details */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Support Ticket Details</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Support Token
                  </label>
                  <p className="text-[#1593E5] font-medium">
                    {selectedTicket.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    User ID
                  </label>
                  <p>{selectedTicket.userId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Report Date
                  </label>
                  <p>{selectedTicket.reportDate}</p>
                </div>
                <div className="">
                  <label className="text-sm font-medium text-muted-foreground mr-2 ">
                    Status
                  </label>
                  <Badge
                    variant={getStatusBadgeVariant(selectedTicket.status)}
                    className={getStatusBadgeStyle(selectedTicket.status)}
                  >
                    {selectedTicket.status}
                  </Badge>
                </div>
                {selectedTicket.solvedDate && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Solved Date
                    </label>
                    <p>{selectedTicket.solvedDate}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Subject
                </label>
                <p className="font-medium">{selectedTicket.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Description
                </label>
                <p className="text-sm leading-relaxed">
                  {selectedTicket.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
