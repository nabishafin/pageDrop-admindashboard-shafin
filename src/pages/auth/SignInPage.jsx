import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "../../assets/LegierGlobalIcon.jpg";
import { Link, Links } from "react-router-dom";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 ">
      <div className="w-full max-w-5xl flex items-center justify-center gap-20">
        {/* Logo Section */}
        <div className="hidden lg:flex items-center justify-center flex-1  pr-5 ">
          <img src={logo} alt="" className="h-96 " />
        </div>

        {/* Sign In Form */}
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Sign In
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                {/* Username/Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-900"
                  >
                    User name
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="h-11 border-gray-300 focus:border-red-900 focus:ring-red-900"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-11 pr-10 border-gray-300 focus:border-[#E32B6B] focus:ring-[#E32B6B]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                      className="border-gray-300 data-[state=checked]:bg-[#E32B6B] data-[state=checked]:border-[#2C6E3E]"
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      Remember me
                    </Label>
                  </div>
                  <Link to={"/forgotpass"}>
                    <button
                      type="button"
                      className="text-sm text-[#E32B6B] hover:text-[#E32B6B] font-medium"
                    >
                      Forgot password?
                    </button>
                  </Link>
                </div>

                {/* Sign In Button */}
                <Link to={"/dashboard"}>
                  <Button
                    type="submit"
                    className="w-full h-11 bg-[#E32B6B] hover:bg-[#E32B6B] text-white font-medium"
                  >
                    Sign In
                  </Button>
                </Link>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
