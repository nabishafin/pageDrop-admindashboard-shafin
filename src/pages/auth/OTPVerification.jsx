import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {
  useVerifyEmailMutation,
  useForgotPasswordMutation,
} from "../../redux/features/auth/authApi";
import { Toaster, toast } from "sonner";

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [verifyEmail] = useVerifyEmailMutation();
  const [forgotPassword] = useForgotPasswordMutation();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (error) setError("");
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();

    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, 6);
        const newOtp = [...otp];
        for (let i = 0; i < digits.length; i++) newOtp[i] = digits[i];
        setOtp(newOtp);
        inputRefs.current[Math.min(digits.length, 5)]?.focus();
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    const resetEmail = localStorage.getItem("resetEmail");
    if (!resetEmail) {
      toast.error("Email not found. Please go back to forgot password.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await verifyEmail({ email: resetEmail, otp: otpString }).unwrap();
      toast.success("OTP verified successfully!");
      navigate("/resetPassword");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForgotPassword = () => navigate("/forgotpass");

  const handleResendOTP = async () => {
    const resetEmail = localStorage.getItem("resetEmail");
    if (!resetEmail) {
      toast.error("Email not found. Please go back to forgot password.");
      return;
    }

    try {
      await forgotPassword({ email: resetEmail }).unwrap();
      toast.success("OTP resent successfully! Please check your email.");
      setError("");
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to resend OTP. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Toaster richColors />
      <div className="w-full max-w-5xl flex items-center justify-center gap-16">
        <div className="hidden lg:flex items-center justify-center flex-1">
          <img src={logo} alt="Logo" className="max-w-sm h-96" />
        </div>

        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={handleBackToForgotPassword}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Verify Email
                </h1>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-8 pb-10">
              <p className="text-base text-gray-600">
                Please enter the 6-digit OTP we have sent to your email.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center gap-3 sm:gap-4">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-12 sm:w-14 h-14 text-center text-xl font-bold border-2 rounded-md ${
                        error
                          ? "border-[#E32B6B]/40 focus:border-[#E32B6B]"
                          : "border-gray-300 focus:border-[#E32B6B]"
                      } focus:ring-[#E32B6B]`}
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-base text-[#E32B6B] text-center">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || otp.join("").length !== 6}
                  className="w-full h-12 text-[16px] bg-gradient-to-r from-[#E32B6B] to-[#FB4A3A] disabled:opacity-50 text-white font-semibold transition-all duration-200"
                >
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      className="text-[#2C6E3E] hover:underline font-medium"
                    >
                      Resend OTP
                    </button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
