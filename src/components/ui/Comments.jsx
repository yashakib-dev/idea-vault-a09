"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const Comments = ({ ideaId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${ideaId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [ideaId]);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleComment = async () => {
    const commentData = {
      ideaId,
      userEmail: user?.email,
      userName: user?.name,
      userImage: user?.image,
      comment,
      createdAt: new Date().toISOString(),
    };

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
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      const remaining = comments.filter((item) => item._id !== id);

      setComments(remaining);
    }
  };

  const handleEdit = (id, currentComment) => {
    setEditingId(id);
    setEditedText(currentComment);
  };

  const handleSaveEdit = async (id) => {
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

    if (data.modifiedCount > 0) {
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
            className="btn mt-4 border-0 bg-[#1A6FBF] text-white hover:bg-[#3FA9D4] rounded-3xl"
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
              <div className="flex justify-between">
                <h3 className="font-bold text-[#1A6FBF]">{item.userName}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item._id, item.comment)}
                    className="btn btn-ghost border border-black/20 dark:border-white/10 text-[#1A6FBF] rounded-full hover:border-[#1A6FBF] dark:hover:bg-[#1A6FBF]/10"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost rounded-full border border-black/20 dark:border-white/10 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingId === item._id ? (
                <div className="mt-3 space-y-3">
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="textarea rounded-2xl bg-white dark:bg-[#2A2A2A] border border-black/20 dark:border-white/10 text-black dark:text-white textarea-bordered w-full"
                  />

                  <button
                    onClick={() => handleSaveEdit(item._id)}
                    className="btn bg-[#1A6FBF]  hover:bg-[#3FA9D4] text-white border-0 mb-2 rounded-full"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300 mb-2">{item.comment}</p>
              )}

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
