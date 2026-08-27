"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";

const categories = [
  "Tech",
  "Health",
  "AI",
  "Education",
  "Finance",
  "E-Commerce",
  "Social",
  "Environment",
];

const MyIdeasClient = ({ ideas: initialIdeas }) => {
  const [ideas, setIdeas] = useState(initialIdeas || []);

  // Modal States
  const [deletingIdea, setDeletingIdea] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editingIdea, setEditingIdea] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Edit Form State
  const [editFormData, setEditFormData] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "Tech",
    tags: "",
    imageURL: "",
    budget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });

  // Open Edit Modal & Populate Form Data
  const handleOpenEdit = (idea) => {
    setEditingIdea(idea);
    setEditFormData({
      title: idea.title || "",
      shortDescription: idea.shortDescription || "",
      detailedDescription: idea.detailedDescription || "",
      category: idea.category || "Tech",
      tags: idea.tags || "",
      imageURL: idea.imageURL || "",
      budget: idea.budget || "",
      targetAudience: idea.targetAudience || "",
      problemStatement: idea.problemStatement || "",
      proposedSolution: idea.proposedSolution || "",
    });
  };

  // Handle Edit Input Changes
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Edit Form
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingIdea) return;

    try {
      setIsSaving(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${editingIdea._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        setIdeas((prev) =>
          prev.map((i) =>
            i._id === editingIdea._id ? { ...i, ...editFormData } : i
          )
        );
        toast.success("Idea updated successfully!");
        setEditingIdea(null);
      } else {
        toast.error("No changes were saved.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update idea.");
    } finally {
      setIsSaving(false);
    }
  };

  // Trigger Delete Confirmation Modal
  const handleOpenDelete = (idea) => {
    setDeletingIdea(idea);
  };

  // Confirm Delete Operation
  const handleConfirmDelete = async () => {
    if (!deletingIdea) return;

    try {
      setIsDeleting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${deletingIdea._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setIdeas((prev) => prev.filter((i) => i._id !== deletingIdea._id));
        toast.success("Idea deleted successfully!");
        setDeletingIdea(null);
      } else {
        toast.error("Could not delete idea.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9FD] dark:bg-[#0B0B0B] py-10 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center lg:text-5xl text-4xl font-bold text-[#1A6FBF]">
          My Ideas
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-3">
          You have shared {ideas?.length || 0} ideas
        </p>

        {ideas?.length === 0 ? (
          <div className="card bg-white dark:bg-[#1E1E1E] shadow-xl p-6 h-[500px] mt-10 rounded-2xl border border-[#d8e8f4] dark:border-white/5">
            <div className="text-center flex flex-col items-center justify-center space-y-3 h-full">
              <Image
                src="https://i.ibb.co.com/dJ0v02WH/idea.png"
                width={200}
                height={200}
                alt="idea"
              />

              <h2 className="lg:text-4xl text-[#1A6FBF] md:text-3xl text-2xl font-bold">
                No ideas yet
              </h2>

              <p className="text-gray-600 dark:text-gray-400">
                Share your first startup idea with the community
              </p>

              <Link href="/add-idea">
                <button className="bg-[#1A6FBF] px-6 py-3 text-white rounded-3xl font-semibold hover:bg-[#3FA9D4] hover:cursor-pointer duration-300 transition">
                  Post Your First Idea
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {ideas?.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-[#1E1E1E] flex flex-col md:flex-row rounded-2xl border border-black/10 dark:border-white/5 overflow-hidden transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                <div className="p-4 md:w-56 shrink-0">
                  <Image
                    src={idea.imageURL || "https://i.ibb.co.com/dJ0v02WH/idea.png"}
                    alt={idea.title || "Startup Idea"}
                    width={220}
                    height={150}
                    className="rounded-xl object-cover w-full h-40 md:h-36"
                  />
                </div>

                <div className="p-5 flex flex-col justify-between w-full">
                  <div>
                    <span className="text-xs px-3 py-1 bg-[#1A6FBF]/10 text-[#1A6FBF] rounded-full font-semibold">
                      {idea.category}
                    </span>

                    <h2 className="text-xl font-bold text-[#1A6FBF] mt-2">
                      {idea.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm mt-1">
                      {idea.shortDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 justify-end">
                    <Link href={`/ideas/${idea._id}`}>
                      <button className="btn btn-sm bg-[#1A6FBF] border-0 text-white rounded-full hover:bg-[#3FA9D4] px-4 cursor-pointer">
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() => handleOpenEdit(idea)}
                      className="btn btn-sm btn-ghost border text-[#1A6FBF] border-black/20 dark:border-white/10 rounded-full hover:border-[#1A6FBF] hover:bg-[#1A6FBF]/10 px-4 cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleOpenDelete(idea)}
                      className="btn btn-sm btn-ghost rounded-full border border-black/20 dark:border-white/10 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 px-4 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     {/* delete warning modal */}
      {deletingIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1E1E1E] text-black dark:text-white border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5">
            <button
              onClick={() => setDeletingIdea(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl cursor-pointer"
            >
              <IoClose />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 text-2xl">
                <FiAlertTriangle />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Delete Idea?
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Are you sure you want to permanently delete{" "}
              <span className="font-semibold text-[#1A6FBF] dark:text-[#3FA9D4]">
                "{deletingIdea.title}"
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingIdea(null)}
                className="btn btn-ghost border border-black/20 dark:border-white/10 rounded-full px-5 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="btn bg-red-600 hover:bg-red-700 border-none text-white rounded-full px-6 cursor-pointer flex items-center gap-2"
              >
                {isDeleting && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit idea modal */}
      {editingIdea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1E1E1E] text-black dark:text-white border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold text-[#1A6FBF]">
                  Edit Startup Idea
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Update your idea details below
                </p>
              </div>

              <button
                onClick={() => setEditingIdea(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl cursor-pointer p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              >
                <IoClose />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-5">
              <div>
                <label className="label py-1">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Idea Title
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter startup idea title"
                  className="input rounded-3xl text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 w-full focus:outline-none focus:border-[#3FA9D4]"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <label className="label py-1">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Short Description
                  </span>
                </label>
                <textarea
                  name="shortDescription"
                  placeholder="Write a short summary"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl w-full min-h-[90px] focus:outline-none focus:border-[#3FA9D4]"
                  value={editFormData.shortDescription}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <label className="label py-1">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Detailed Description
                  </span>
                </label>
                <textarea
                  name="detailedDescription"
                  placeholder="Explain your startup idea in detail"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl w-full min-h-[140px] focus:outline-none focus:border-[#3FA9D4]"
                  value={editFormData.detailedDescription}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="label py-1">
                    <span className="label-text text-[#1A6FBF] font-semibold">
                      Category
                    </span>
                  </label>
                  <select
                    name="category"
                    className="select text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl w-full focus:outline-none focus:border-[#3FA9D4]"
                    value={editFormData.category}
                    onChange={handleEditChange}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label py-1">
                    <span className="label-text text-[#1A6FBF] font-semibold">
                      Estimated Budget
                    </span>
                  </label>
                  <input
                    type="number"
                    name="budget"
                    placeholder="$5000"
                    className="input text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl w-full focus:outline-none focus:border-[#3FA9D4]"
                    value={editFormData.budget}
                    onChange={handleEditChange}
                  />
                </div>
              </div>

              <div>
                <label className="label py-1">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Tags
                  </span>
                </label>
                <input
                  type="text"
                  name="tags"
                  placeholder="AI, SaaS, Startup, Mobile App"
                  className="input text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl w-full focus:outline-none focus:border-[#3FA9D4]"
                  value={editFormData.tags}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label className="label py-1">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Image URL
                  </span>
                </label>
                <input
                  type="url"
                  name="imageURL"
                  placeholder="https://yourimage/image.jpg"
                  className="input text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 w-full rounded-3xl focus:outline-none focus:border-[#3FA9D4]"
                  value={editFormData.imageURL}
                  onChange={handleEditChange}
                />
              </div>

              <div>
                <label className="label py-1">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Target Audience
                  </span>
                </label>
                <textarea
                  name="targetAudience"
                  placeholder="Who will use this product?"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl w-full min-h-[90px] focus:outline-none focus:border-[#3FA9D4]"
                  value={editFormData.targetAudience}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <label className="label py-1">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Problem Statement
                  </span>
                </label>
                <textarea
                  name="problemStatement"
                  placeholder="What problem are you solving?"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl w-full min-h-[100px] focus:outline-none focus:border-[#3FA9D4]"
                  value={editFormData.problemStatement}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div>
                <label className="label py-1">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Proposed Solution
                  </span>
                </label>
                <textarea
                  name="proposedSolution"
                  placeholder="Describe your proposed solution"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl w-full min-h-[110px] focus:outline-none focus:border-[#3FA9D4]"
                  value={editFormData.proposedSolution}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setEditingIdea(null)}
                  className="btn btn-ghost border border-black/20 dark:border-white/10 rounded-full px-6 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="btn rounded-full border-none text-white bg-[#1A6FBF] hover:bg-[#3FA9D4] cursor-pointer px-8 transition-all font-bold flex items-center gap-2"
                >
                  {isSaving && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIdeasClient;

