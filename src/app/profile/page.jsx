"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineLightBulb, HiOutlineMail } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
import { useSession } from "@/lib/auth-client";
import { FiEdit2 } from "react-icons/fi";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const [ideasCount, setIdeasCount] = useState(0);
  const [interactionsCount, setInteractionsCount] = useState(0);

  useEffect(() => {
    if (user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas/${user.email}`)
        .then((res) => res.json())
        .then((data) => setIdeasCount(data.length));

      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-comments/${user.email}`)
        .then((res) => res.json())
        .then((data) => setInteractionsCount(data.length));
    }
  }, [user]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F9FD] dark:bg-[#0B0B0B] transition-colors duration-300">
        <span className="loading loading-spinner loading-lg text-[#1A6FBF]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F9FD] dark:bg-[#0B0B0B] py-10 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-black/10 dark:border-white/5 shadow-sm overflow-hidden transition-colors duration-300">
     
          <div className="h-48 bg-gradient-to-r from-[#1A6FBF] to-[#3FA9D4]" />

          <div className="px-8 pb-8 relative">

            <div className="-mt-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div className="flex flex-col lg:flex-row lg:items-end gap-5">
                <Image
                  src={
                    user?.image || "https://i.ibb.co.com/xqykWXq5/avatar-15.png"
                  }
                  alt={user?.name || "user"}
                  width={130}
                  height={130}
                  className="rounded-full border-[6px] border-white dark:border-[#1E1E1E] object-cover h-32 w-32 shadow-lg bg-white dark:bg-[#1E1E1E]"
                />

                <div className="pb-2">
                  <h2 className="text-3xl font-black text-black dark:text-white pb-2">
                    {user?.name}
                  </h2>

                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-2">
                    <HiOutlineMail />
                    <p>{user?.email}</p>
                  </div>

                  <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    Joined {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link href="/edit-profile" className="btn border-0 bg-[#1A6FBF] text-white rounded-2xl hover:bg-[#3FA9D4]">
                <FiEdit2 />
                Edit Profile
              </Link>

            </div>

         
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        
              <div className="bg-[#F4F9FD] dark:bg-[#2A2A2A] rounded-2xl p-6 border border-[#d8e8f4] dark:border-white/5 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Ideas</p>

                    <h2 className="text-4xl font-black text-[#1A6FBF] dark:text-[#3FA9D4] mt-2">
                      {ideasCount}
                    </h2>
                  </div>

                  <div className="bg-[#1A6FBF]/10 p-4 rounded-2xl">
                    <HiOutlineLightBulb className="text-3xl text-[#1A6FBF]" />
                  </div>
                </div>
              </div>

              <div className="bg-[#F4F9FD] dark:bg-[#2A2A2A] rounded-2xl p-6 border border-[#d8e8f4] dark:border-white/5 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Total Interactions</p>

                    <h2 className="text-4xl font-black text-[#1A6FBF] dark:text-[#3FA9D4] mt-2">
                      {interactionsCount}
                    </h2>
                  </div>

                  <div className="bg-[#1A6FBF]/10 p-4 rounded-2xl">
                    <RiUserSettingsLine className="text-3xl text-[#1A6FBF]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
