import { useState, useEffect, useOptimistic } from "react";
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
import { Search, Eye, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  useGetSupportTicketsQuery,
  useUpdateSupportStatusMutation,
} from "../../../redux/features/support/supportApi";

// ✅ Memoized row to prevent full re-render
import React, { memo } from "react";
import CustomLoading from "@/components/ui/CustomLoading";

const TicketRow = memo(function TicketRow({
  ticket,
  onStatusChange,
  onView,
  getStatusBadgeVariant,
  getStatusBadgeStyle,
}) {
  return (
    <TableRow key={ticket._id}>
      <TableCell className="font-medium text-center text-[#1593E5]">
        {ticket.supportToken}
      </TableCell>
      <TableCell className="text-start">{ticket.subject}</TableCell>
      <TableCell className="text-center">
        {new Date(ticket.reportDate).toLocaleDateString()}
      </TableCell>
      <TableCell className="text-center">{ticket.userId}</TableCell>
      <TableCell className="text-center">
        <Select
          value={ticket.status}
          onValueChange={(newStatus) => onStatusChange(ticket._id, newStatus)}
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
            <SelectItem value="Unsolved">
              <Badge className="bg-white text-red-500 rounded-full border-red-500">
                Unsolved
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
        {ticket.solvedDate
          ? new Date(ticket.solvedDate).toLocaleDateString()
          : "-"}
      </TableCell>
      <TableCell className="text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView(ticket)}
          className="border-none bg-none shadow-none"
        >
          <Eye />
        </Button>
      </TableCell>
    </TableRow>
  );
});

export default function Support() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ticketsPerPage = 9;

  const { data, isLoading, isError } = useGetSupportTicketsQuery({
    page: currentPage,
    limit: ticketsPerPage,
    search: searchTerm,
    status: statusFilter,
    timeRange:
      timeFilter === "custom"
        ? `${customStartDate}_${customEndDate}`
        : timeFilter,
  });

  const [updateSupportStatus] = useUpdateSupportStatusMutation();

  // Optimistic update hook
  const [optimisticTickets, setOptimisticTickets] = useOptimistic(
    data?.tickets || [],
    (state, { ticketId, newStatus }) => {
      return state.map((ticket) => {
        if (ticket._id === ticketId) {
          return {
            ...ticket,
            status: newStatus,
            solvedDate:
              newStatus === "Resolved"
                ? new Date().toISOString() // ✅ Set current date
                : ticket.solvedDate,
          };
        }
        return ticket;
      });
    }
  );

  const tickets = optimisticTickets;
  const totalPages = data?.totalPages || 1;
  const totalTickets = data?.totalTickets || 0;

  useEffect(() => {
    if (data?.tickets) {
      setOptimisticTickets(data.tickets);
    }
  }, [data?.tickets, setOptimisticTickets]);

  // ✅ Handle status change (optimistic + real API)
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      // Optimistic update first
      setOptimisticTickets({ ticketId, newStatus });

      // Then API call
      await updateSupportStatus({
        id: ticketId,
        status: newStatus,
        ...(newStatus === "Resolved" && {
          solvedDate: new Date().toISOString(),
        }),
      }).unwrap();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleStartDateChange = (date) => {
    setCustomStartDate(date);
    if (date && customEndDate) setTimeFilter("custom");
  };

  const handleEndDateChange = (date) => {
    setCustomEndDate(date);
    if (customStartDate && date) setTimeFilter("custom");
  };

  const handleTimeFilterChange = (value) => {
    setTimeFilter(value);
    if (value !== "custom") {
      setCustomStartDate("");
      setCustomEndDate("");
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Resolved":
        return "default";
      case "Open":
        return "secondary";
      case "Unsolved":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "Resolved":
        return "border-[1px] border-blue-500 text-blue-500 rounded-full bg-white px-3";
      case "Open":
        return "border-[1px] border-orange-500 text-orange-500 bg-white rounded-full px-6";
      case "Unsolved":
        return "border-[1px] border-red-500 text-red-500 bg-white rounded-full";
      default:
        return "rounded-full";
    }
  };

  return (
    <div className="mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Support</h1>
      </div>

      {/* Filters */}
      <Card className="rounded-lg">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by token ID, subject, description, or user ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Unsolved">Unsolved</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
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

      {/* Table */}
      <Card className="rounded-lg">
        <CardContent className="p-0">
          {isLoading ? (
            <CustomLoading />
          ) : isError ? (
            <div className="text-center py-8 text-red-500">
              Error loading tickets.
            </div>
          ) : (
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
                {tickets.map((ticket) => (
                  <TicketRow
                    key={ticket._id}
                    ticket={ticket}
                    onStatusChange={handleStatusChange}
                    onView={handleViewTicket}
                    getStatusBadgeVariant={getStatusBadgeVariant}
                    getStatusBadgeStyle={getStatusBadgeStyle}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {Math.min((currentPage - 1) * ticketsPerPage + 1, totalTickets)} to{" "}
          {Math.min(currentPage * ticketsPerPage, totalTickets)} of{" "}
          {totalTickets} items
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
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
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Modal */}
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
                    {selectedTicket.supportToken}
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
                  <p>
                    {new Date(selectedTicket.reportDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mr-2">
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
                    <p>
                      {new Date(selectedTicket.solvedDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Subject
                </label>
                <p className="font-medium">{selectedTicket.subject}</p>
              </div>
              <div></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
