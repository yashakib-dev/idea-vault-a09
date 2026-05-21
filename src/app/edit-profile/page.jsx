"use client";

import { useSession } from "@/lib/auth-client";

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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${authUser.email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profile.name,
          image: profile.image,
          
        }),
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0 || data.upsertedCount > 0) {
      toast.success("Profile updated");
    } else {
      toast.error("Nothing changed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F4F9FD] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow">

        <h2 className="text-3xl font-bold text-[#1A6FBF] mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            className="input w-full bg-white border-black/50 text-black border rounded-xl p-3"
          />

          <input
            name="image"
            value={profile.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="input w-full bg-white border-black/50 text-black border rounded-xl p-3"
          />


          <button
            disabled={loading}
            className="bg-[#1A6FBF] text-white px-6 py-3 rounded-xl w-full"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;