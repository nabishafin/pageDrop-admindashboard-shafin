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
    DialogFooter,
} from "@/components/ui/dialog";
import { Search, ChevronLeft, ChevronRight, Loader2, MoreVertical, ShieldCheck, UserPlus, Pencil, Ban, CheckCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import CustomLoading from "@/components/ui/CustomLoading";
import {
    useGetUsersQuery,
    useCreateUserMutation,
    useBlockUserMutation,
    useUpdateUserAdminMutation,
    useAssignSubscriptionMutation,
    useDeleteUserMutation
} from "@/redux/features/user/userApi";

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [subscriptionFilter, setSubscriptionFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [timeFilter, setTimeFilter] = useState("all");
    const [customStartDate, setCustomStartDate] = useState("");
    const [customEndDate, setCustomEndDate] = useState("");
    const [activeTimeRange, setActiveTimeRange] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const usersPerPage = 10;

    // Modals state
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState("");

    // Create User Form State
    const [createUserForm, setCreateUserForm] = useState({
        email: "",
        password: "",
        fullName: "",
        role: "user",
        phoneNumber: "",
        designation: "",
        address: ""
    });

    // Edit User Form State
    const [editUserForm, setEditUserForm] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        role: "",
        isBlocked: false,
        address: "",
        designation: ""
    });

    // API Hooks
    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
    const [updateUserAdmin, { isLoading: isUpdating }] = useUpdateUserAdminMutation();
    const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
    const [assignSubscription, { isLoading: isAssigning }] = useAssignSubscriptionMutation();
    const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Update activeTimeRange
    useEffect(() => {
        if (timeFilter === "custom") {
            if (customStartDate && customEndDate) {
                setActiveTimeRange(`${customStartDate}_${customEndDate}`);
            }
        } else {
            setActiveTimeRange(timeFilter);
        }
    }, [timeFilter, customStartDate, customEndDate]);

    // Reset page on filter change
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, subscriptionFilter, statusFilter, activeTimeRange]);

    const getQueryParams = () => {
        const baseParams = {
            page: currentPage,
            limit: usersPerPage,
            search: debouncedSearch,
            status: statusFilter,
            subscription: subscriptionFilter,
        };

        if (activeTimeRange.includes("_")) {
            const [start, end] = activeTimeRange.split("_");
            return {
                ...baseParams,
                timeRange: "custom",
                startDate: start,
                endDate: end,
            };
        }

        return {
            ...baseParams,
            timeRange: activeTimeRange,
        };
    };

    const {
        data,
        isLoading,
        isFetching,
        error: queryError,
    } = useGetUsersQuery(getQueryParams());

    const users = data?.data?.users || [];
    const totalUsers = data?.data?.totalUsers || 0;
    const totalPages = data?.data?.totalPages || 1;

    // Handlers
    const handleCreateUser = async () => {
        try {
            await createUser(createUserForm).unwrap();
            toast.success("User created successfully");
            setIsCreateModalOpen(false);
            setCreateUserForm({
                email: "",
                password: "",
                fullName: "",
                role: "user",
                phoneNumber: ""
            });
        } catch (error) {
            toast.error(error?.data?.message || "Failed to create user");
        }
    };

    const handleUpdateUser = async () => {
        if (!selectedUser) return;
        try {
            // Remove empty fields
            const dataToUpdate = Object.fromEntries(
                Object.entries(editUserForm).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
            );

            await updateUserAdmin({
                userId: selectedUser.userId,
                data: dataToUpdate
            }).unwrap();
            toast.success("User updated successfully");
            setIsEditModalOpen(false);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update user");
        }
    };

    const handleBlockToggle = async (user) => {
        try {
            await blockUser({
                userId: user.userId,
                isBlocked: !user.isBlocked // Toggle status
            }).unwrap();
            toast.success(`User ${user.isBlocked ? 'unblocked' : 'blocked'} successfully`);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update block status");
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditUserForm({
            fullName: user.fullName || "",
            email: user.email || "",
            phoneNumber: user.phone || "", // Note: API returns 'phone' but update expects 'phoneNumber'? Check consistency. Let's send phoneNumber.
            role: user.role || "user",
            isBlocked: user.isBlocked || false,
            address: user.address || "",
            designation: user.designation || ""
        });
        setIsEditModalOpen(true);
    };

    const handleDeleteUser = async () => {
        if (!selectedUser?.email) {
            toast.error("User email is missing");
            return;
        }
        try {
            await deleteUser({ email: selectedUser.email }).unwrap();
            toast.success("User deleted successfully");
            setIsDeleteModalOpen(false);
            setSelectedUser(null);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete user");
        }
    };

    return (
        <div className="mx-auto space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">User Management</h1>
                <Button onClick={() => setIsCreateModalOpen(true)} className="bg-[#4FB2F3] hover:bg-[#3ba0e0]">
                    <UserPlus className="mr-2 h-4 w-4" /> Create User
                </Button>
            </div>

            {/* Filters */}
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
                            <Select value={subscriptionFilter} onValueChange={setSubscriptionFilter}>
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

            {/* Users Table */}
            <Card className="rounded-lg">
                <CardContent className="p-0">
                    {isLoading ? (
                        <CustomLoading />
                    ) : queryError ? (
                        <div className="flex items-center justify-center py-20 text-red-500">
                            Error loading users. Please try again.
                        </div>
                    ) : users.length === 0 ? (
                        <div className="flex items-center justify-center py-20 text-muted-foreground">
                            No users found
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
                                        <TableHead className="text-center">Role</TableHead>
                                        <TableHead className="text-center">Subscription</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead className="text-center">Blocked</TableHead>
                                        <TableHead className="text-center">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.userId}>
                                            <TableCell className="text-center font-medium">
                                                {user.fullName || "N/A"}
                                            </TableCell>
                                            <TableCell className="text-center">{user.email || "N/A"}</TableCell>
                                            <TableCell className="text-center bg-gray-50 rounded-md">
                                                {user.role || "user"}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant="outline"
                                                    className={`rounded-full px-3 py-1 ${user.subscriptionType === "monthly"
                                                        ? "border-[#1593E5] text-[#1593E5]"
                                                        : user.subscriptionType === "yearly"
                                                            ? "border-[#F3934F] text-[#F3934F]"
                                                            : "border-gray-400 text-gray-400"
                                                        }`}
                                                >
                                                    {user.subscriptionType || "None"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge
                                                    variant="outline"
                                                    className={`rounded-full px-3 py-1 ${user.userStatus === "active"
                                                        ? "border-green-500 text-green-500"
                                                        : "border-yellow-500 text-yellow-500"
                                                        }`}
                                                >
                                                    {user.userStatus || "Incomplete"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {user.isBlocked ? (
                                                    <Badge variant="destructive">Blocked</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => openEditModal(user)}>
                                                            <Pencil className="mr-2 h-4 w-4" /> Edit Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleBlockToggle(user)}>
                                                            {user.isBlocked ? (
                                                                <>
                                                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Unblock User
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Ban className="mr-2 h-4 w-4 text-red-500" /> Block User
                                                                </>
                                                            )}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => {
                                                            setSelectedUser(user);
                                                            setIsSubscriptionModalOpen(true);
                                                        }}>
                                                            <ShieldCheck className="mr-2 h-4 w-4" /> Manage Subscription
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedUser(user);
                                                                setIsDeleteModalOpen(true);
                                                            }}
                                                            className="text-red-600 focus:text-red-600"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete User
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Pagination (Simplified for brevity, same as AllUsers) */}
            {!isLoading && users.length > 0 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {(currentPage - 1) * usersPerPage + 1} to {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} users
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1 || isFetching}
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || isFetching}
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Create User Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Create New User</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Full Name</label>
                            <Input
                                value={createUserForm.fullName}
                                onChange={(e) => setCreateUserForm({ ...createUserForm, fullName: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Email</label>
                            <Input
                                value={createUserForm.email}
                                onChange={(e) => setCreateUserForm({ ...createUserForm, email: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Password</label>
                            <Input
                                type="password"
                                value={createUserForm.password}
                                onChange={(e) => setCreateUserForm({ ...createUserForm, password: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Phone</label>
                            <Input
                                value={createUserForm.phoneNumber}
                                onChange={(e) => setCreateUserForm({ ...createUserForm, phoneNumber: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Designation</label>
                            <Input
                                value={createUserForm.designation}
                                onChange={(e) => setCreateUserForm({ ...createUserForm, designation: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Address</label>
                            <Input
                                value={createUserForm.address}
                                onChange={(e) => setCreateUserForm({ ...createUserForm, address: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Role</label>
                            <Select
                                value={createUserForm.role}
                                onValueChange={(val) => setCreateUserForm({ ...createUserForm, role: val })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateUser} disabled={isCreating} className="bg-[#4FB2F3]">
                            {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create User"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Edit User Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Full Name</label>
                            <Input
                                value={editUserForm.fullName}
                                onChange={(e) => setEditUserForm({ ...editUserForm, fullName: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Email</label>
                            <Input
                                value={editUserForm.email}
                                onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Phone</label>
                            <Input
                                value={editUserForm.phoneNumber}
                                onChange={(e) => setEditUserForm({ ...editUserForm, phoneNumber: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Designation</label>
                            <Input
                                value={editUserForm.designation}
                                onChange={(e) => setEditUserForm({ ...editUserForm, designation: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Address</label>
                            <Input
                                value={editUserForm.address}
                                onChange={(e) => setEditUserForm({ ...editUserForm, address: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label className="text-right text-sm">Role</label>
                            <Select
                                value={editUserForm.role}
                                onValueChange={(val) => setEditUserForm({ ...editUserForm, role: val })}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleUpdateUser} disabled={isUpdating} className="bg-[#4FB2F3]">
                            {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Subscription Modal (Reused) */}
            <Dialog open={isSubscriptionModalOpen} onOpenChange={setIsSubscriptionModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Assign Subscription</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">User Name</label>
                                <Input value={selectedUser?.fullName || ""} disabled readOnly />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">User ID</label>
                                <Input value={selectedUser?.userId || ""} disabled readOnly />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="plan" className="text-sm font-medium">Select Plan</label>
                            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                                <SelectTrigger id="plan">
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">Free</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSubscriptionModalOpen(false)} disabled={isAssigning}>Cancel</Button>
                        <Button onClick={async () => {
                            if (!selectedPlan) return toast.error("Please select a plan");
                            try {
                                await assignSubscription({ userId: selectedUser.userId, subscriptionType: selectedPlan }).unwrap();
                                toast.success("Subscription updated");
                                setIsSubscriptionModalOpen(false);
                                setSelectedPlan("");
                            } catch (err) {
                                toast.error("Failed to update subscription");
                            }
                        }} disabled={isAssigning} className="bg-[#4FB2F3]">
                            {isAssigning ? "Updating..." : "Update Subscription"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                            Are you sure you want to delete <span className="font-semibold text-foreground">{selectedUser?.fullName || selectedUser?.email}</span>?
                        </p>
                        <p className="text-sm text-red-600 mt-2">
                            This action cannot be undone. All user data will be permanently deleted.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteUser}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...</> : "Delete User"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
