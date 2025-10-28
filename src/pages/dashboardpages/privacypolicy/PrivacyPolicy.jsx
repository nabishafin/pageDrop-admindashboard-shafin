import { useGetPrivacyPolicyQuery } from "@/redux/features/settings/settingsApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

const PrivacyPolicy = () => {
  const { data, isLoading, isError } = useGetPrivacyPolicyQuery();

  const policy = data?.data;

  return (
    <div className="font-sans pr-5">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-black p-5 rounded-lg">
        {policy?.title || "Privacy Policy"}
      </h2>

      {/* Content container */}
      <div className="relative bg-white rounded-lg p-6 max-h-[70vh] overflow-y-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load privacy policy.</p>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: policy?.content
                ? policy.content.replace(/<p>/g, "").replace(/<\/p>/g, "<br />")
                : "",
            }}
          />
        )}

        {/* Edit Button */}
      </div>
      <div className="absolute bottom-4 right-4 pr-5">
        <Link to="/dashboard/settings/editprivacy">
          <Button className="bg-[#4FB2F3] hover:bg-[#4FB2F3] text-white rounded-full flex items-center space-x-1 shadow-md">
            <Edit className="h-4 w-4" />
            <span>Update Privacy Policy</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
