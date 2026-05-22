"use client";

import { useSession, authClient } from "@/lib/auth-client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileEdit = () => {
  const { data: session } = useSession();
  const authUser = session?.user;

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    image: "",
  
  });


  useEffect(() => {
    if (authUser?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${authUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          setProfile({
            name: data?.name || "",
            image: data?.image || "",
          
          });
        });
    }
  }, [authUser]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Update Better Auth session & collection
      const { data: authData, error: authError } = await authClient.updateUser({
        name: profile?.name,
        image: profile?.image,
      });

      if (authError) {
        throw new Error(authError.message || "Failed to update auth profile");
      }

      // 2. Sync with custom backend
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${authUser.email}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profile?.name,
            image: profile?.image,
          }),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0 || data.upsertedCount > 0 || authData) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Nothing changed");
      }
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9FD] dark:bg-[#0B0B0B] py-10 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 border border-black/10 dark:border-white/5 shadow-sm transition-colors duration-300">

        <h2 className="text-3xl font-bold text-[#1A6FBF] dark:text-[#3FA9D4] mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            value={profile?.name}
            onChange={handleChange}
            placeholder="Name"
            className="input w-full bg-white dark:bg-[#2A2A2A] border-black/20 dark:border-white/10 text-black dark:text-white border rounded-xl p-3 focus:outline-none focus:border-[#3FA9D4]"
          />

          <input
            name="image"
            value={profile?.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="input w-full bg-white dark:bg-[#2A2A2A] border-black/20 dark:border-white/10 text-black dark:text-white border rounded-xl p-3 focus:outline-none focus:border-[#3FA9D4]"
          />


          <button
            disabled={loading}
            className="bg-[#1A6FBF] hover:bg-[#3FA9D4] text-white px-6 py-3 rounded-xl w-full cursor-pointer transition duration-300 font-semibold"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;