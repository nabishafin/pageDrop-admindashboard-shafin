import { useState } from "react";
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

const coupons = [
  {
    id: "1",
    code: "STUDENT50",
    discount: 50,
    usage: 321,
    maxUsage: 1000,
    status: "Active",
    expires: "8/27/25",
    campaignName: "Student Discount Campaign",
    couponName: "STUDENT50",
    targetAudience: "Students",
    expiry: "8/27/25",
  },
  {
    id: "2",
    code: "SAVANA",
    discount: 30,
    usage: 156,
    maxUsage: 500,
    status: "Expired",
    expires: "4/21/19",
    campaignName: "Savana Sale",
    couponName: "SAVANA",
    targetAudience: "All users",
    expiry: "4/21/19",
  },
  {
    id: "3",
    code: "200WON",
    discount: 20,
    usage: 89,
    maxUsage: 200,
    status: "Active",
    expires: "9/21/25",
    campaignName: "200 Won Special",
    couponName: "200WON",
    targetAudience: "Premium users",
    expiry: "9/21/25",
  },
  {
    id: "4",
    code: "750WON",
    discount: 75,
    usage: 234,
    maxUsage: 300,
    status: "Active",
    expires: "8/31/17",
    campaignName: "750 Won Mega Sale",
    couponName: "750WON",
    targetAudience: "VIP users",
    expiry: "8/31/17",
  },
  {
    id: "5",
    code: "725WON",
    discount: 25,
    usage: 67,
    maxUsage: 150,
    status: "Active",
    expires: "8/31/17",
    campaignName: "725 Won Promo",
    couponName: "725WON",
    targetAudience: "New users",
    expiry: "8/31/17",
  },
  {
    id: "6",
    code: "SATWON",
    discount: 15,
    usage: 445,
    maxUsage: 600,
    status: "Expired",
    expires: "4/21/12",
    campaignName: "Saturday Special",
    couponName: "SATWON",
    targetAudience: "Weekend shoppers",
    expiry: "4/21/12",
  },
  {
    id: "7",
    code: "SUNWON",
    discount: 40,
    usage: 123,
    maxUsage: 400,
    status: "Expired",
    expires: "4/21/12",
    campaignName: "Sunday Sale",
    couponName: "SUNWON",
    targetAudience: "All users",
    expiry: "4/21/12",
  },
  {
    id: "8",
    code: "FRIWON",
    discount: 35,
    usage: 278,
    maxUsage: 500,
    status: "Active",
    expires: "8/31/17",
    campaignName: "Friday Flash Sale",
    couponName: "FRIWON",
    targetAudience: "Flash sale subscribers",
    expiry: "8/31/17",
  },
];

export function CouponTable() {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const couponsPerPage = 8;

  const handleViewCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setIsModalOpen(true);
  };

  const getUsagePercentage = (usage, maxUsage) => {
    return (usage / maxUsage) * 100;
  };

  const filteredCoupons = coupons.filter((coupon) => {
    if (statusFilter === "All") return true;
    return coupon.status === statusFilter;
  });

  const totalPages = Math.ceil(filteredCoupons.length / couponsPerPage);
  const startIndex = (currentPage - 1) * couponsPerPage;
  const endIndex = startIndex + couponsPerPage;
  const currentCoupons = filteredCoupons.slice(startIndex, endIndex);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4 bg-white p-5 rounded-lg shadow mt-5">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search" className="pl-10" />
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
              <TableHead className="text-center">Code</TableHead>
              <TableHead className="text-center">Discount</TableHead>
              <TableHead className="text-center">Usage</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Expires</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCoupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell className="font-medium text-center">
                  {coupon.code}
                </TableCell>
                <TableCell className="text-center">
                  {coupon.discount}%
                </TableCell>
                <TableCell className="text-center">
                  <div className="space-y-2">
                    <div className="flex justify-center text-sm">
                      <span>
                        {coupon.usage}/{coupon.maxUsage}
                      </span>
                    </div>
                    <Progress
                      value={getUsagePercentage(coupon.usage, coupon.maxUsage)}
                      className="h-2 [&>div]:bg-[#4FB2F3] [&>div]:hover:bg-[#4FB2F3]"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <Badge
                      variant={
                        coupon.status === "Active" ? "default" : "destructive"
                      }
                      className={`rounded-full ${
                        coupon.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-500 hover:bg-red-100"
                      }`}
                    >
                      {coupon.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-center">{coupon.expires}</TableCell>
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
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + couponsPerPage, filteredCoupons.length)} of{" "}
          {filteredCoupons.length} coupons
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

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Coupon</DialogTitle>
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
                    <span className="text-muted-foreground">Coupon Name:</span>
                    <span className="font-medium">
                      {selectedCoupon.couponName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount:</span>
                    <span className="font-medium">
                      {selectedCoupon.discount}% OFF
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usage:</span>
                    <span className="font-medium text-[#4FB2F3] ">
                      {selectedCoupon.usage}/{selectedCoupon.maxUsage}
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
                      {selectedCoupon.expiry === "No expiry"
                        ? "No expiry"
                        : selectedCoupon.expiry}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
