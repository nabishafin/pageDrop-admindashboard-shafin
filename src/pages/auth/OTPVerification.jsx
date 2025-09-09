import { useState, useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import logo from "../../assets/logo.png";

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (error) setError("");
    if (value && index < 4) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, "").slice(0, 5);
        const newOtp = [...otp];
        for (let i = 0; i < digits.length && i < 5; i++) {
          newOtp[i] = digits[i];
        }
        setOtp(newOtp);
        inputRefs.current[Math.min(digits.length, 4)]?.focus();
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 5) {
      setError("Please enter all 5 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          otpString === "12345" ? resolve() : reject(new Error("Invalid OTP"));
        }, 1500);
      });

      console.log("OTP verified successfully:", otpString);
      // Navigate to reset password page
    } catch {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForgotPassword = () => {
    console.log("Navigate back to forgot password");
  };

  const handleResendOTP = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("OTP resent");
      setError("");
    } catch {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-5xl flex items-center justify-center gap-16">
        {/* Logo Section */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <div className="relative">
            <div className=" pr-12 ">
              <img src={logo} alt="Logo" className="max-w-sm h-96" />
            </div>
          </div>
        </div>

        {/* OTP Form */}
        <div className="w-full max-w-md">
          <Card className="shadow-lg ">
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
                Please enter the 5-digit OTP we have sent to your email.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center gap-4">
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
                      className={`w-14 h-14 text-center text-xl font-bold border-2 rounded-md ${
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
                  disabled={isLoading || otp.join("").length !== 5}
                  className="w-full h-12 text-[16px] bg-gradient-to-r from-[#E32B6B] to-[#FB4A3A]  disabled:opacity-50 text-white font-semibold transition-all duration-200"
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
