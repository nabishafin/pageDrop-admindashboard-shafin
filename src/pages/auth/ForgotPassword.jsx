import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import logo from "../../assets/LegierGlobalIcon.jpg";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("OTP sent successfully! Please check your email.");
      navigate("/otpverification");
    } catch (error) {
      console.error("Forgot password error:", error);
      const errorMessage =
        error?.data?.message ||
        error?.error?.data?.message ||
        "Failed to send OTP. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Toaster richColors />
      <div className="w-full max-w-6xl flex items-center justify-center gap-10">
        <div className="hidden lg:flex items-center justify-center flex-1">
          <img src={logo} alt="Logo" className="max-w-sm h-96" />
        </div>

        <div className="w-full max-w-lg mx-auto">
          <Card>
            <CardContent className="pt-8 pb-10 px-8">
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => navigate("/signin")}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  type="button"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">
                  Forgot Password
                </h1>
              </div>

              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Please enter your email address to receive a One Time Password
                (OTP) for resetting your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-base font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 text-[16px] border-gray-300 focus:border-[#2C6E3E] focus:ring-[#2C6E3E]"
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-[16px] bg-gradient-to-r from-[#E32B6B] to-[#FB4A3A] text-white font-semibold transition-all duration-200 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
