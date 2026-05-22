import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const metadata = {
  title: "My Interactions",
};
const MyInteractionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-comments/${session?.user.email}`,
    {
      cache: "no-store",
    },
  );

  const comments = await res.json();
  return (
    <div className="min-h-screen bg-[#F4F9FD] dark:bg-[#0B0B0B] py-10 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-5xl font-bold text-[#1A6FBF]">
          My Interactions
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-3">
          All your comments and contributions across the platform
        </p>
        <div className="card bg-white dark:bg-[#1E1E1E] shadow-xl p-6 mt-10 rounded-2xl border border-[#d8e8f4] dark:border-white/5">
          <h2 className="text-2xl text-black dark:text-white font-bold">Comments ({comments.length})</h2>

          <p className="text-gray-600 dark:text-gray-400 mb-4">Ideas you&apos;ve commented on</p>

          {comments?.length === 0 ? (
            <div className="text-gray-500">No comments</div>
          ) : (
            <div className="space-y-4 mt-6">
              {comments.map((item) => (
                <div
                  key={item._id}
                  className="card bg-white dark:bg-[#2A2A2A] shadow-xl p-6 rounded-2xl border border-[#d8e8f4] dark:border-white/5"
                >
                  <div className="flex justify-between">
                    <h2 className="font-bold text-[#1A6FBF]">
                      {item.userName}
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <p className="mt-3 text-gray-600 dark:text-gray-300">{item.comment}</p>
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
