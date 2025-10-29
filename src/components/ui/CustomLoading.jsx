import React, { useState, useEffect } from "react";

const CustomLoading = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 4 ? "" : prev + "."));
    }, 100); // প্রতি 0.5 সেকেন্ডে একটি ডট যোগ হবে
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 bg-white p-5 rounded-lg shadow mt-5">
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4FB2F3] mx-auto"></div>
          <p className="mt-3 text-sm text-gray-600 font-semibold">
            Loading <span className="text-blue-500"> {dots}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomLoading;
