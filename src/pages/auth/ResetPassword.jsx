import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { Toaster, toast } from "sonner";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const resetPasswordToken = localStorage.getItem("resetPasswordToken");
    if (!resetPasswordToken) {
      toast.error("Reset token not found. Please restart the forgot password process.");
      navigate("/forgotpass");
      return;
    }

    try {
      const res = await resetPassword({
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      if (res) {
        toast.success("Password reset successfully!");
        localStorage.removeItem("resetPasswordToken");
        localStorage.removeItem("resetEmail");
        navigate("/signin");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to reset password. Please try again.");
    }
  };

  const handleBackToOTP = () => {
    navigate("/otpverification");
  };

  const handleBackToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <Toaster richColors />
      <div className="w-full max-w-5xl flex items-center justify-center gap-12">
        {/* Logo Section */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="relative  pr-10 ">
            <img src={logo} alt="" className="h-96" />
          </div>
        </div>

        {/* Reset Password Form */}
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={handleBackToOTP}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-semibold text-gray-900">
                  Reset Password
                </h1>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-gray-600 mb-6">
                Use different password for your security
              </p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* New Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="newPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    New Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password"
                      className={`h-11 pr-10 border-gray-300 focus:border-[#2C6E3E] focus:ring-[#2C6E3E] ${
                        errors.newPassword ? "border-red-300" : ""
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-xs text-red-500">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                      className={`h-11 pr-10 border-gray-300 focus:border-[#2C6E3E] focus:ring-[#2C6E3E] ${
                        errors.confirmPassword ? "border-red-300" : ""
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* General Error */}
                {errors.general && (
                  <p className="text-sm text-red-500 text-center">
                    {errors.general}
                  </p>
                )}

                {/* Reset Password Button */}
                <Button
                  type="submit"
                  disabled={
                    isLoading ||
                    !formData.newPassword ||
                    !formData.confirmPassword
                  }
                  className="w-full h-11 bg-gradient-to-b from-[#E32B6B] to-[#FB4A3A] hover:from-[#E32B6B] hover:to-[#E32B6B] disabled:opacity-50 text-white font-medium transition-all duration-200"
                >
                  {isLoading ? "Resetting Password..." : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

