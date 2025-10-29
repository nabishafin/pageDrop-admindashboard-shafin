import React from "react";

const CustomLoading = () => {
  return (
    <div className="space-y-4 bg-white p-5 rounded-lg shadow mt-5">
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4FB2F3] mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading ...</p>
        </div>
      </div>
    </div>
  );
};

export default CustomLoading;
