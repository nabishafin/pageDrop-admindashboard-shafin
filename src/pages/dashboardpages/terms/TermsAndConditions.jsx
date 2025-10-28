import { useGetTermsConditionsQuery } from "@/redux/features/settings/settingsApi";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  const { data, isLoading, isError } = useGetTermsConditionsQuery();

  const terms = data?.data;
  console.log(terms);

  return (
    <div className="">
      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-black">
          {terms?.title || "Terms & Conditions"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="px-6 py-3 text-black relative rounded-2xl">
        {isLoading ? (
          <div>
            <p>Loading...</p>
          </div>
        ) : isError ? (
          <p className="text-red-400">Failed to load terms</p>
        ) : (
          <div className="min-h-screen">
            {/* Terms HTML Content from API */}
            <div
              className="terms-content" // Change: prose prose-invert থেকে terms-content
              dangerouslySetInnerHTML={{ __html: terms?.content }}
            />
          </div>
        )}

        {/* Edit Button */}
        <Link
          to="/dashboard/settings/editterms"
          className="fixed bottom-20 right-6"
        >
          <button className="bg-[#23769D] text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-[#1f5f7e] transition-colors shadow-lg">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Terms & Conditions
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TermsAndConditions;
