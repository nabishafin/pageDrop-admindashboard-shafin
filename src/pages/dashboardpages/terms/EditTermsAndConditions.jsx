import React, { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

const EditTermsAndConditions = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isMounted] = useState(true); // demo purpose

  // Editor Config (white/light theme)
  const config = {
    readonly: false,
    height: 600,
    theme: "light",
    toolbarAdaptive: false,
    removeButtons: ["source", "fullsize", "about", "print", "file"],
    style: {
      background: "#ffffff",
      color: "#000000",
    },
    controls: {
      font: {
        list: {
          "Arial, Helvetica, sans-serif": "Arial",
          "Georgia, serif": "Georgia",
          "Impact, Charcoal, sans-serif": "Impact",
          "Tahoma, Geneva, sans-serif": "Tahoma",
          "'Times New Roman', Times, serif": "Times New Roman",
          "Verdana, Geneva, sans-serif": "Verdana",
        },
      },
    },
  };

  const handleUpdate = async () => {
    if (!content.trim()) {
      alert("Content cannot be empty");
      return;
    }
    alert("Updated successfully!");
    navigate(-1);
  };

  if (!isMounted) {
    return <div className="text-gray-700 p-4">Loading editor...</div>;
  }

  return (
    <div className="bg-white text-black flex flex-col rounded-lg ">
      {/* Header */}
      <div className="flex items-center p-4  border-gray-300 sticky top-0 bg-white z-10 rounded-lg">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft className="w-6 h-6 hover:text-blue-500 transition-colors" />
        </button>
        <h1 className="text-lg font-semibold tracking-wide">
          Edit Terms and Conditions
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4">
        {/* Editor Container */}
        <div className="flex-grow mb-4">
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
            {isMounted && (
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={(newContent) => setContent(newContent)}
              />
            )}
          </div>
        </div>

        {/* Update Button */}
        <div className="bg-white border-t border-gray-300 pt-4">
          <button
            onClick={handleUpdate}
            className="w-full bg-[#4FB2F3] hover:bg-[#4FB2F3] text-white px-8 py-3 rounded-lg font-medium shadow-md   transition-colors"
          >
            Update
          </button>
        </div>
      </div>

      {/* Jodit CSS */}
      <style jsx global>{`
        .jodit-container,
        .jodit-workplace {
          background: #ffffff !important;
          color: #000000 !important;
        }
        .jodit-toolbar__box {
          background: #f9f9f9 !important;
          border-bottom: 1px solid #ccc !important;
        }
        .jodit-icon {
          color: #000000 !important;
        }
      `}</style>
    </div>
  );
};

export default EditTermsAndConditions;
