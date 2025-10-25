import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit, Eye, Plus, Loader2 } from "lucide-react";
import {
  useGetFaqsQuery,
  useAddFaqMutation,
  useEditFaqMutation,
  useDeleteFaqMutation,
} from "../../../redux/features/faq/faqApi";


export default function FaqManagement() {
  const { data, isLoading, isError } = useGetFaqsQuery();
  const [addFaq] = useAddFaqMutation();
  const [updateFaq] = useEditFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();

  const [faqs, setFaqs] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });

  useEffect(() => {
    if (data) {
      setFaqs(data);
    }
  }, [data]);

  const handleAddFaq = async () => {
    if (formData.question && formData.answer) {
      await addFaq(formData);
      setFormData({ question: "", answer: "" });
      setIsAddModalOpen(false);
    }
  };

  const handleEditFaq = async () => {
    if (selectedFaq && formData.question && formData.answer) {
      await updateFaq({ id: selectedFaq._id, ...formData });
      setFormData({ question: "", answer: "" });
      setIsEditModalOpen(false);
      setSelectedFaq(null);
    }
  };

  const handleDeleteFaq = async () => {
    if (selectedFaq) {
      await deleteFaq(selectedFaq._id);
      setIsDeleteModalOpen(false);
      setSelectedFaq(null);
    }
  };

  const openEditModal = (faq) => {
    setSelectedFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (faq) => {
    setSelectedFaq(faq);
    setIsDeleteModalOpen(true);
  };

  const openViewModal = (faq) => {
    setSelectedFaq(faq);
    setIsViewModalOpen(true);
  };

  return (
    <div className="space-y-6  ">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">FAQ Management</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#4FB2F3] hover:bg-[#3DA1D7] text-white px-4 py-2 rounded-lg transition-colors shadow-md">
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-xl text-gray-800">
                Add new FAQ
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="question" className="text-gray-700 font-medium">
                  Question
                </Label>
                <Input
                  id="question"
                  placeholder="How to apply for a campaign?"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  className="mt-1 border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label
                  htmlFor="description"
                  className="text-gray-700 font-medium"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  rows={4}
                  className="mt-1 border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#4FB2F3] text-white"
                  onClick={handleAddFaq}
                >
                  Submit
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-lg shadow-md border-0">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
            </div>
          ) : isError ? (
            <div className="text-center py-8 text-red-500">
              Error loading FAQs.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="w-16 text-center font-semibold py-4 px-4 text-gray-700">
                      SL
                    </th>
                    <th className="text-start font-semibold py-4 px-4 text-gray-700">
                      Questions
                    </th>
                    <th className="text-start font-semibold py-4 px-4 text-gray-700">
                      Answers
                    </th>
                    <th className="w-40 text-center font-semibold py-4 px-4 text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map((faq, index) => (
                    <tr
                      key={faq._id}
                      className={`border-b border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="text-center py-4 px-4 text-gray-700 font-medium">
                        {index + 1}
                      </td>
                      <td className="font-medium text-start py-4 px-4 text-gray-800">
                        {faq.question}
                      </td>
                      <td className="text-start py-4 px-4 text-gray-600 whitespace-pre-wrap break-words">
                        {faq.answer.length > 80
                          ? faq.answer.slice(0, 80) + "..."
                          : faq.answer}
                      </td>

                      <td className="text-center py-4 px-4">
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-500 hover:bg-blue-100 bg-transparent w-9 h-9 p-0 rounded-full"
                            onClick={() => openViewModal(faq)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-green-500 hover:bg-green-100 bg-transparent w-9 h-9 p-0 rounded-full"
                            onClick={() => openEditModal(faq)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:bg-red-100 bg-transparent w-9 h-9 p-0 rounded-full"
                            onClick={() => openDeleteModal(faq)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-800">
              Edit FAQ
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label
                htmlFor="edit-question"
                className="text-gray-700 font-medium"
              >
                Question
              </Label>
              <Input
                id="edit-question"
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                className="mt-1 border-gray-300 focus:border-blue-500"
              />
            </div>
            <div>
              <Label
                htmlFor="edit-description"
                className="text-gray-700 font-medium"
              >
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                rows={4}
                className="mt-1 border-gray-300 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#4FB2F3] text-white"
                onClick={handleEditFaq}
              >
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-red-600">
              Delete FAQ Question
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete the FAQ question "
              {selectedFaq?.question}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteFaq}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-gray-800">
              FAQ Details
            </DialogTitle>
          </DialogHeader>
          {selectedFaq && (
            <div className="space-y-4 py-2">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Question
                </Label>
                <p className="mt-1 text-sm text-gray-800 p-2 bg-gray-50 rounded-md">
                  {selectedFaq.question}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Answer
                </Label>
                <p className="mt-1 text-sm text-gray-600 p-2 bg-gray-50 rounded-md">
                  {selectedFaq.answer}
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
