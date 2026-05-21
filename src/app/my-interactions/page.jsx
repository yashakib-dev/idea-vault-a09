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
    <div className="min-h-screen bg-[#F4F9FD] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-5xl font-bold text-[#1A6FBF]">
          My Interactions
        </h2>
        <p className="text-center text-gray-600 mt-3">
          All your comments and contributions across the platform
        </p>
        <div className="card bg-[#F4F9FD] shadow-xl p-6 mt-10 rounded-2xl border border-[#d8e8f4]">
          <h2 className="text-2xl text-black font-bold">Comments ({comments.length})</h2>

          <p className="text-gray-600 mb-4">Ideas you've commented on</p>

          {comments?.length === 0 ? (
            <div>No comments</div>
          ) : (
            <div className="space-y-4 mt-6">
              {comments.map((item) => (
                <div
                  key={item._id}
                  className="card bg-white shadow-xl p-6 rounded-2xl border border-[#d8e8f4]"
                >
                  <div className="flex justify-between">
                    <h2 className="font-bold text-[#1A6FBF]">
                      {item.userName}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <p className="mt-3 text-gray-600">{item.comment}</p>
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
