import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Eye, EyeOff } from "lucide-react";

export default function ResetPasswordSetting() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md mt-30 bg-white shadow-lg">
        <CardHeader className="text-center border-b border-dotted border-gray-300 pb-4">
          <CardTitle className="text-xl font-medium text-[#4FB2F3]">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Old Password Field */}
            <div className="relative">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-3 border border-gray-200">
                <Key className="h-5 w-5 text-gray-500" />
                <Input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter old password"
                  value={formData.oldPassword}
                  onChange={(e) =>
                    handleInputChange("oldPassword", e.target.value)
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showOldPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <div className="flex items-center space-x-3  rounded-lg px-3 py-3 border ">
                <Key className="h-5 w-5 text-gray-500" />
                <Input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new Password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-3 border border-gray-200">
                <Key className="h-5 w-5 text-gray-500" />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-left">
              <button
                type="button"
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#4FB2F3] hover:bg-[#3a9eda] text-white py-5 rounded-full font-medium"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
