"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MyIdeasClient = ({ ideas: initialIdeas }) => {
  const [ideas, setIdeas] = useState(initialIdeas);

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDesc, setEditedDesc] = useState("");

  const handleEdit = (idea) => {
    setEditingId(idea._id);
    setEditedTitle(idea.title);
    setEditedDesc(idea.shortDescription);
  };

  const handleSave = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editedTitle,
        shortDescription: editedDesc,
      }),
    });

    const data = await res.json();

    if (data.modifiedCount > 0) {
      setIdeas((prev) =>
        prev.map((i) =>
          i._id === id
            ? { ...i, title: editedTitle, shortDescription: editedDesc }
            : i,
        ),
      );

      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount > 0) {
      setIdeas((prev) => prev.filter((i) => i._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9FD] dark:bg-[#0B0B0B] py-10 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center lg:text-5xl text-4xl font-bold text-[#1A6FBF]">
          My Ideas
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-3">
          You have shared {ideas?.length} ideas
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
                className="bg-white dark:bg-[#1E1E1E] flex rounded-2xl border border-black/10 dark:border-white/5 overflow-hidden transition-colors duration-300"
              >
                <div className="p-4">
                  <Image
                    src={idea.imageURL}
                    alt={idea.title}
                    width={200}
                    height={150}
                    className="rounded-xl object-cover"
                  />
                </div>

                <div className="p-5 flex justify-between w-full">
                  <div>
                    <span className="text-xs px-3 py-1 bg-[#1A6FBF]/10 text-[#1A6FBF] rounded-full">
                      {idea.category}
                    </span>

                    <h2 className="text-xl font-bold text-[#1A6FBF] mt-2">
                      {idea.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {idea.shortDescription}
                    </p>


                    {editingId === idea._id && (
                      <div className="space-y-2 mt-3">
                        <input
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="input bg-white dark:bg-[#2A2A2A] border border-gray-300 dark:border-white/10 text-black dark:text-white w-full rounded-2xl"
                        />

                        <textarea
                          value={editedDesc}
                          onChange={(e) => setEditedDesc(e.target.value)}
                          className="textarea bg-white dark:bg-[#2A2A2A] border border-gray-300 dark:border-white/10 text-black dark:text-white textarea-bordered w-full rounded-2xl"
                        />

                        <button
                          onClick={() => handleSave(idea._id)}
                          className="btn rounded-full bg-[#1A6FBF] text-white"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link href={`/ideas/${idea._id}`}>
                      <button className="btn btn-sm bg-[#1A6FBF] border-0 text-white rounded-full hover:bg-[#3FA9D4]">
                        View
                      </button>
                    </Link>

                    <button
                      onClick={() => handleEdit(idea)}
                      className="btn btn-sm btn-ghost border text-[#1A6FBF] border-black/20 dark:border-white/10 rounded-full hover:border-[#1A6FBF] hover:bg-[#1A6FBF]/10"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(idea._id)}
                      className="btn btn-sm btn-ghost rounded-full border border-black/20 dark:border-white/10 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
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
    </div>
  );
};

export default MyIdeasClient;
