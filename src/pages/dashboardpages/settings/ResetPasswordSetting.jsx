import { useState } from "react";
import { Key, Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";

export default function ResetPasswordSetting() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      alert("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md mt-10 bg-white shadow-lg rounded-lg">
        <div className="text-center pb-4">
          <h2 className="text-xl font-medium text-[#4FB2F3] mt-8">
            Reset Password
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password Field */}
            <div className="relative">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-3 border border-gray-200">
                <Key className="h-5 w-5 text-gray-500" />
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    handleInputChange("currentPassword", e.target.value)
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-500 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div className="relative">
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-3 border border-gray-200">
                <Key className="h-5 w-5 text-gray-500" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange("newPassword", e.target.value)
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-500 w-full"
                  required
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
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="border-0 bg-transparent p-0 focus-visible:ring-0 placeholder:text-gray-500 w-full"
                  required
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4FB2F3] hover:bg-[#3a9eda] text-white py-2 rounded-full font-medium disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
