import { useGetTermsConditionsQuery } from "@/redux/features/settings/settingsApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import CustomLoading from "@/components/ui/CustomLoading";

const TermsAndConditions = () => {
  const { data, isLoading, isError } = useGetTermsConditionsQuery();

  const terms = data?.data;

  return (
    <div className="font-sans pr-5">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-black p-5 rounded-lg">
        {terms?.title || "Terms & Conditions"}
      </h2>

      {/* Content container */}
      <div className="relative bg-white rounded-lg p-6 max-h-[70vh] overflow-y-auto">
        {isLoading ? (
          <CustomLoading />
        ) : isError ? (
          <p className="text-red-500">Failed to load terms.</p>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: decodeHtmlEntities(terms?.content),
            }}
          />
        )}
      </div>
      <div className="absolute bottom-4 right-4 pr-5">
        <Link to="/dashboard/settings/editterms">
          <Button className="bg-[#23769D] hover:bg-[#1f5f7e] text-white rounded-full flex items-center space-x-1 shadow-md">
            <Edit className="h-4 w-4" />
            <span>Edit Terms & Conditions</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Helper function to decode HTML entities
const decodeHtmlEntities = (htmlString) => {
  if (!htmlString) return "";
  let decodedString = htmlString;
  const textarea = document.createElement("textarea");

  // Recursively decode until no more entities are found
  while (
    decodedString.includes("&lt;") ||
    decodedString.includes("&gt;") ||
    decodedString.includes("&amp;")
  ) {
    textarea.innerHTML = decodedString;
    decodedString = textarea.value;
  }

  return decodedString;
};

export default TermsAndConditions;
