"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";

const Comments = ({ ideaId, title }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  // Delete Warning Modal state
  const [deletingComment, setDeletingComment] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!ideaId) return;
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${ideaId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [ideaId]);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleComment = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const commentData = {
      ideaId,
      title,
      userEmail: user?.email,
      userName: user?.name || "Anonymous",
      userImage: user?.image,
      comment,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      const data = await res.json();

      if (data.insertedId) {
        setComments([
          {
            ...commentData,
            _id: data.insertedId,
          },
          ...comments,
        ]);
        setComment("");
        toast.success("Comment posted successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment");
    }
  };

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
      toast.error("An error occurred while deleting the comment.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (id, currentComment) => {
    setEditingId(id);
    setEditedText(currentComment);
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: editedText,
        }),
      });

      const data = await res.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        const updatedComments = comments.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              comment: editedText,
            };
          }
          return item;
        });

        setComments(updatedComments);
        setEditingId(null);
        setEditedText("");
        toast.success("Comment updated!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update comment");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Comments</h2>

        <div className="border p-6 shadow-lg rounded-2xl border-black/20 dark:border-white/10 w-full bg-white dark:bg-[#1E1E1E]">
          <label className="label">
            <span className="label-text mb-2 text-black dark:text-white font-semibold">
              Add a comment...
            </span>
          </label>

          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full text-black dark:text-white border border-black/20 dark:border-white/10 rounded-2xl bg-white dark:bg-[#2A2A2A] focus:outline-none focus:border-[#3FA9D4]"
          />

          <button
            onClick={handleComment}
            className="btn mt-4 border-0 bg-[#1A6FBF] text-white hover:bg-[#3FA9D4] rounded-3xl cursor-pointer"
          >
            Post Comment
          </button>
        </div>

        <div className="space-y-4">
          {comments.map((item) => (
            <div
              key={item._id}
              className="border border-black/10 dark:border-white/5 rounded-2xl p-5 bg-white dark:bg-[#1E1E1E] shadow-sm transition-colors duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#1A6FBF]">{item.userName || "Anonymous"}</h3>

                {user?.email === item.userEmail && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item._id, item.comment)}
                      className="btn btn-sm btn-ghost border border-black/20 dark:border-white/10 text-[#1A6FBF] rounded-full hover:border-[#1A6FBF] dark:hover:bg-[#1A6FBF]/10 cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setDeletingComment(item)}
                      className="btn btn-sm btn-ghost rounded-full border border-black/20 dark:border-white/10 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {editingId === item._id ? (
                <div className="mt-3 space-y-3">
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="textarea rounded-2xl bg-white dark:bg-[#2A2A2A] border border-black/20 dark:border-white/10 text-black dark:text-white textarea-bordered w-full focus:outline-none focus:border-[#3FA9D4]"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(item._id)}
                      className="btn btn-sm bg-[#1A6FBF] hover:bg-[#3FA9D4] text-white border-0 rounded-full px-5 cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn btn-sm btn-ghost border border-black/20 dark:border-white/10 text-gray-600 dark:text-gray-300 rounded-full cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300 my-2">{item.comment}</p>
              )}

              <p className="text-gray-500 dark:text-gray-400 text-xs">
                {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Delete comment warning modal  */}
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
              Are you sure you want to delete this comment?
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

export default Comments;

