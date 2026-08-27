"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";

const MyInteractionsClient = ({ initialComments = [] }) => {
  const [comments, setComments] = useState(initialComments);

  // Delete Warning Modal State
  const [deletingComment, setDeletingComment] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deletingComment) return;

    try {
      setIsDeleting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${deletingComment._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setComments((prev) => prev.filter((item) => item._id !== deletingComment._id));
        toast.success("Comment deleted successfully!");
        setDeletingComment(null);
      } else {
        toast.error("Could not delete comment.");
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
          My Interactions
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-3">
          All your comments and contributions across the platform
        </p>

        <div className="card bg-white dark:bg-[#1E1E1E] shadow-xl p-6 mt-10 rounded-2xl border border-[#d8e8f4] dark:border-white/5">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-2xl text-black dark:text-white font-bold">
                Comments ({comments?.length || 0})
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Ideas you&apos;ve commented on
              </p>
            </div>
          </div>

          {!comments || comments.length === 0 ? (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              You haven&apos;t commented on any ideas yet.
            </div>
          ) : (
            <div className="space-y-4 mt-6">
              {comments.map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-[#2A2A2A] shadow-sm hover:shadow-md p-6 rounded-2xl border border-[#d8e8f4] dark:border-white/10 flex flex-col md:flex-row justify-between items-start gap-4 transition-all duration-200"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs px-3 py-1 bg-[#1A6FBF]/10 text-[#1A6FBF] font-semibold rounded-full">
                        Idea Comment
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1A6FBF] dark:text-[#3FA9D4]">
                      {item.ideaTitle || "Startup Idea"}
                    </h3>

                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed bg-[#F4F9FD] dark:bg-[#1E1E1E] p-3 rounded-xl border border-black/5 dark:border-white/5">
                      "{item.comment}"
                    </p>
                  </div>

                  <div className="shrink-0 self-start flex items-center gap-2">
                    <Link href={`/ideas/${item.ideaId}`}>
                      <button className="btn bg-[#1A6FBF] hover:bg-[#3FA9D4] border-0 text-white rounded-full px-5 flex items-center gap-2 font-semibold transition-all cursor-pointer">
                        View Idea
                        <FaArrowRightLong />
                      </button>
                    </Link>

                    <button
                      onClick={() => setDeletingComment(item)}
                      className="btn btn-ghost rounded-full border border-black/20 dark:border-white/10 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 px-4 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= DELETE COMMENT WARNING MODAL ================= */}
      {deletingComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1E1E1E] text-black dark:text-white border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-5">
            <button
              onClick={() => setDeletingComment(null)}
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
                  Delete Comment?
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Are you sure you want to delete your comment on{" "}
              <span className="font-semibold text-[#1A6FBF] dark:text-[#3FA9D4]">
                "{deletingComment.ideaTitle || "this idea"}"
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeletingComment(null)}
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
    </div>
  );
};

export default MyInteractionsClient;
