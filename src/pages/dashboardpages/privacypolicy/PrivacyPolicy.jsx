import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const policyParagraphs = [
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",

    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
    "Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. ...",
  ];

  return (
    <div className="font-sans pr-5">
      {/* Header */}
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-black p-5 rounded-lg">
        Privacy Policy
      </h2>

      {/* Content container */}
      <div className="relative bg-white rounded-lg p-6 max-h-[70vh] overflow-y-auto">
        {policyParagraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-gray-700 leading-relaxed text-justify mb-4"
          >
            {paragraph}
          </p>
        ))}

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
