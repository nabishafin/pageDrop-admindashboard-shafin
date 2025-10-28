import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

import {
  useGetTermsConditionsQuery,
  useUpdateTermsConditionsMutation,
} from "@/redux/features/settings/settingsApi";

const EditTermsAndConditions = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [termsId, setTermsId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const { data: response, isLoading, isError } = useGetTermsConditionsQuery();
  const [updateTerms, { isLoading: isUpdating }] =
    useUpdateTermsConditionsMutation();

  // Enhanced Editor Config
  const config = {
    readonly: false,
    height: 600,
    theme: "default",
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
    // Editor content styling
    editorCssClass: "jodit-editor-content",
    // Ensure proper HTML rendering
    enter: "P",
    defaultMode: "1", // WYSIWYG mode
    toolbarSticky: true,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
  };

  useEffect(() => {
    setIsMounted(true);
    if (response?.data) {
      setContent(response.data.content);
      setTermsId(response.data._id);
    }
  }, [response]);

  const handleUpdate = async () => {
    if (!content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }
    if (!termsId) {
      toast.error("Could not find Terms & Conditions ID.");
      return;
    }

    try {
      console.log("Sending update with:", { id: termsId, content });

      const result = await updateTerms({ id: termsId, content }).unwrap();

      toast.success("Terms & Conditions updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error?.data?.message || "Failed to update Terms & Conditions"
      );
    }
  };

  if (!isMounted) {
    return <div className="text-black p-4">Loading editor...</div>;
  }

  if (isLoading) {
    return (
      <div className="text-black p-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return <div className="text-black p-4">Error loading terms</div>;
  }

  return (
    <div className="text-black flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b sticky top-0 bg-white z-10">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft className="w-6 h-6 hover:text-blue-600" />
        </button>
        <h1 className="text-lg font-medium">Edit Terms & Conditions</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 bg-white">
        {/* Editor Container */}
        <div className="flex-grow mb-4">
          <div className="rounded-lg border overflow-hidden">
            {isMounted && (
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => {}} // Optional: handle real-time changes
              />
            )}
          </div>
        </div>

        {/* Update Button */}
        <div className="border-t border-gray-300 pt-4">
          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className={`w-full bg-[#23769D] text-white px-8 py-3 rounded-lg font-medium transition-colors ${
              isUpdating
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#1f5f7e]"
            }`}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      {/* Enhanced Jodit Editor Styling */}
      <style jsx global>{`
        /* Jodit Container & Toolbar */
        .jodit-container,
        .jodit-workplace {
          background: #ffffff !important;
          color: #000000 !important;
        }

        .jodit-toolbar__box {
          background: #f8f9fa !important;
          border-bottom: 1px solid #ddd !important;
        }

        .jodit-icon {
          color: #000000 !important;
        }

        .jodit-toolbar-button:hover {
          background: #e9ecef !important;
        }

        /* Editor Content Area Styling */
        .jodit-wysiwyg {
          padding: 20px !important;
          line-height: 1.75 !important;
          color: #000000 !important;
        }

        /* Headings in Editor */
        .jodit-wysiwyg h1 {
          font-size: 2em !important;
          font-weight: bold !important;
          margin: 1em 0 0.5em !important;
          color: #000000 !important;
        }

        .jodit-wysiwyg h2 {
          font-size: 1.5em !important;
          font-weight: bold !important;
          margin: 1em 0 0.5em !important;
          color: #000000 !important;
        }

        .jodit-wysiwyg h3 {
          font-size: 1.25em !important;
          font-weight: bold !important;
          margin: 1em 0 0.5em !important;
          color: #000000 !important;
        }

        /* Paragraphs in Editor */
        .jodit-wysiwyg p {
          margin: 1em 0 !important;
          color: #000000 !important;
        }

        /* Text Formatting in Editor */
        .jodit-wysiwyg strong,
        .jodit-wysiwyg b {
          font-weight: bold !important;
        }

        .jodit-wysiwyg em,
        .jodit-wysiwyg i {
          font-style: italic !important;
        }

        .jodit-wysiwyg u {
          text-decoration: underline !important;
        }

        /* Lists in Editor */
        .jodit-wysiwyg ul,
        .jodit-wysiwyg ol {
          margin: 1em 0 !important;
          padding-left: 2em !important;
        }

        .jodit-wysiwyg ul {
          list-style-type: disc !important;
        }

        .jodit-wysiwyg ol {
          list-style-type: decimal !important;
        }

        .jodit-wysiwyg li {
          margin: 0.5em 0 !important;
          color: #000000 !important;
        }

        /* Links in Editor */
        .jodit-wysiwyg a {
          color: #23769d !important;
          text-decoration: underline !important;
        }

        /* Tables in Editor */
        .jodit-wysiwyg table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 1em 0 !important;
        }

        .jodit-wysiwyg th,
        .jodit-wysiwyg td {
          border: 1px solid #ddd !important;
          padding: 0.5em !important;
          text-align: left !important;
          color: #000000 !important;
        }

        .jodit-wysiwyg th {
          background-color: #f8f9fa !important;
          font-weight: bold !important;
        }

        /* Blockquotes in Editor */
        .jodit-wysiwyg blockquote {
          border-left: 4px solid #23769d !important;
          padding-left: 1em !important;
          margin: 1em 0 !important;
          font-style: italic !important;
          color: #333 !important;
        }

        /* Code in Editor */
        .jodit-wysiwyg code {
          background-color: #f4f4f4 !important;
          padding: 0.2em 0.4em !important;
          border-radius: 3px !important;
          font-family: monospace !important;
          color: #c7254e !important;
        }

        .jodit-wysiwyg pre {
          background-color: #f4f4f4 !important;
          padding: 1em !important;
          border-radius: 5px !important;
          overflow-x: auto !important;
          margin: 1em 0 !important;
        }

        /* Horizontal Rule in Editor */
        .jodit-wysiwyg hr {
          border: none !important;
          border-top: 1px solid #ddd !important;
          margin: 2em 0 !important;
        }

        /* Images in Editor */
        .jodit-wysiwyg img {
          max-width: 100% !important;
          height: auto !important;
          margin: 1em 0 !important;
          border-radius: 5px !important;
        }
      `}</style>
    </div>
  );
};

export default EditTermsAndConditions;
