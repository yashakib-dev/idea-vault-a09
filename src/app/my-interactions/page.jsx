import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FaArrowRightLong } from "react-icons/fa6";

export const metadata = {
  title: "My Interactions",
};

const MyInteractionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-comments/${session?.user?.email}`,
    {
      cache: "no-store",
    },
  );

  const comments = await res.json();

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

                  <div className="shrink-0 self-start">
                    <Link href={`/ideas/${item.ideaId}`}>
                      <button className="btn bg-[#1A6FBF] hover:bg-[#3FA9D4] border-0 text-white rounded-full px-5 flex items-center gap-2 font-semibold transition-all cursor-pointer">
                        View Idea
                        <FaArrowRightLong />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInteractionsPage;

