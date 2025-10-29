import { useState, useEffect } from "react";
import {
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllCouponsQuery, useDeleteCouponMutation } from "@/redux/features/promocodes/promocodesApi";

export function CouponTable() {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const couponsPerPage = 10;

  const { data: couponsData, isLoading, error } = useGetAllCouponsQuery({
    page: currentPage,
    limit: couponsPerPage,
    search: searchTerm,
    status: statusFilter,
  });

  const [deleteCoupon] = useDeleteCouponMutation();

  // Extract coupons from API response or use empty array as fallback
  const coupons = couponsData?.coupons || [];
  const totalPages = couponsData?.totalPages || 1;
  const totalCoupons = couponsData?.totalCoupons || 0;

  const handleViewCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const handleDelete = (couponId) => {
    deleteCoupon(couponId);
  };

  const getUsagePercentage = (usage, maxUsage) => {
    if (maxUsage === "unlimited" || !maxUsage) return 0;
    const usageNum = parseInt(usage) || 0;
    const maxUsageNum = parseInt(maxUsage) || 1;
    return (usageNum / maxUsageNum) * 100;
  };

  const getUsageDetails = (usageCount, usageLimit) => {
    return { usageCount, usageLimit };
  };

  const getStatus = (coupon) => {
    if (!coupon.expiry) return "Active";

    const expiryDate = new Date(coupon.expiry);
    const today = new Date();
    return expiryDate > today ? "Active" : "Expired";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No expiry";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDiscount = (coupon) => {
    if (coupon.discountType === "Percentage") {
      return `${coupon.discountValue}%`;
    } else if (coupon.discountType === "Fixed Amount") {
      return `€${coupon.discountValue}`;
    }
    return `${coupon.discountValue}`;
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <div className="space-y-4 bg-white p-5 rounded-lg shadow mt-5">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4FB2F3] mx-auto"></div>
            <p className="mt-2 text-sm text-muted-foreground">
              Loading coupons...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 bg-white p-5 rounded-lg shadow mt-5">
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-red-500">
            <p>Error loading coupons</p>
            <p className="text-sm text-muted-foreground">
              Please try again later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white p-5 rounded-lg shadow mt-5">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by campaign, code, or audience..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter: {statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleStatusFilter("All")}>
              <div className="flex items-center gap-2">
                {statusFilter === "All" && <Check className="h-4 w-4" />}
                <span className={statusFilter !== "All" ? "ml-6" : ""}>
                  All
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("Active")}>
              <div className="flex items-center gap-2">
                {statusFilter === "Active" && <Check className="h-4 w-4" />}
                <span className={statusFilter !== "Active" ? "ml-6" : ""}>
                  Active
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("Expired")}>
              <div className="flex items-center gap-2">
                {statusFilter === "Expired" && <Check className="h-4 w-4 " />}
                <span
                  className={
                    statusFilter !== "Expired" ? "ml-6" : " rounded-full"
                  }
                >
                  Expired
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Campaign</TableHead>
              <TableHead className="text-center">Code</TableHead>
              <TableHead className="text-center">Discount</TableHead>
              <TableHead className="text-center">Usage</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Expires</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No coupons found
                </TableCell>
              </TableRow>
            ) : (
              coupons.map((coupon) => {
                const status = getStatus(coupon);
                const usage = getUsageDetails(coupon.usageCount, coupon.usageLimit);
                const maxUsageDisplay =
                  usage.usageLimit === "unlimited"
                    ? "unlimited"
                    : usage.usageLimit;

                return (
                  <TableRow key={coupon._id}>
                    <TableCell className="text-center font-medium">
                      {coupon.campaignName}
                    </TableCell>
                    <TableCell className="font-medium text-center">
                      {coupon.couponCode}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDiscount(coupon)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="space-y-2">
                        <div className="flex justify-center text-sm">
                          <span>
                            {coupon.usageCount}/{maxUsageDisplay}
                          </span>
                        </div>
                        {coupon.usageLimit !== "unlimited" && (
                          <Progress
                            value={getUsagePercentage(coupon.usageCount, coupon.usageLimit)}
                            className="h-2 [&>div]:bg-[#4FB2F3] [&>div]:hover:bg-[#4FB2F3]"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Badge
                          variant={
                            status === "Active" ? "default" : "destructive"
                          }
                          className={`rounded-full ${
                            status === "Active"
                              ? "border-[1px] border-green-500 text-green-500 hover:bg-green-100 bg-white px-3"
                              : "border-[1px] border-red-500 text-red-500 bg-white"
                          }`}
                        >
                          {status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDate(coupon.expires)}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewCoupon(coupon)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(coupon._id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalCoupons > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * couponsPerPage + 1} to{" "}
            {Math.min(currentPage * couponsPerPage, totalCoupons)} of{" "}
            {totalCoupons} coupons
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
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 p-0 ${
                      currentPage === pageNum
                        ? "bg-[#4FB2F3] hover:bg-[#4FB2F3]"
                        : ""
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
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
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Coupon Details</DialogTitle>
          </DialogHeader>
          {selectedCoupon && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Campaign Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Campaign Name:
                    </span>
                    <span className="font-medium text-[#4FB2F3] ">
                      {selectedCoupon.campaignName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coupon Code:</span>
                    <span className="font-medium">
                      {selectedCoupon.couponCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Discount Type:
                    </span>
                    <span className="font-medium">
                      {selectedCoupon.discountType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Discount Value:
                    </span>
                    <span className="font-medium">
                      {formatDiscount(selectedCoupon)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="font-medium text-[#4FB2F3] ">
                      {selectedCoupon.usageCount}/
                      {selectedCoupon.usageLimit === "unlimited"
                        ? "Unlimited"
                        : selectedCoupon.usageLimit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Target Audience:
                    </span>
                    <span className="font-medium">
                      {selectedCoupon.targetAudience}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expiry:</span>
                    <span className="font-medium">
                      {formatDate(selectedCoupon.expiry)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">
                      <Badge
                        variant={
                          getStatus(selectedCoupon) === "Active"
                            ? "default"
                            : "destructive"
                        }
                        className={`rounded-full ${
                          getStatus(selectedCoupon) === "Active"
                            ? "border-[1px] border-green-500 text-green-500 hover:bg-green-100 bg-white px-3"
                            : "border-[1px] border-red-500 text-red-500 bg-white"
                        }`}
                      >
                        {getStatus(selectedCoupon)}
                      </Badge>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
