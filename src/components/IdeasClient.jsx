"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const IdeasClient = ({ initialIdeas }) => {
  const [ideas, setIdeas] = useState(initialIdeas);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchIdeas = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-ideas?search=${search}&category=${category}`,
        { cache: "no-store" },
      );

      const data = await res.json();
      setIdeas(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search ideas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered focus:outline-none text-black dark:text-white bg-white dark:bg-[#1E1E1E] border border-black/20 dark:border-white/10 w-full rounded-2xl focus:border-[#3FA9D4]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered text-black dark:text-white border border-black/20 dark:border-white/10 bg-white dark:bg-[#1E1E1E] focus:outline-none rounded-2xl focus:border-[#3FA9D4]"
        >
          <option>All</option>
          <option>Tech</option>
          <option>AI</option>
          <option>Health</option>
          <option>Education</option>
          <option>Finance</option>
        </select>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#1A6FBF] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-[#1A6FBF] font-semibold">Loading ideas...</p>
        </div>
      )}


      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas?.map((idea) => (
          <div
            key={idea._id}
            className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/5 bg-white dark:bg-[#1E1E1E] shadow-sm hover:shadow-[0_20px_50px_rgba(26,111,191,0.12)] hover:-translate-y-2 transition-all duration-300 ease-out"
          >
            <Image
              src={idea?.imageURL}
              alt={idea?.title}
              width={800}
              height={600}
              className="h-52 w-full object-cover"
            />

            <div className="p-5 space-y-3">
              <span className="inline-flex rounded-full bg-[#1A6FBF]/10 px-3 py-1 text-xs font-semibold text-[#1A6FBF]">
                {idea?.category}
              </span>

              <h3 className="text-lg text-[#1A6FBF] font-bold line-clamp-1">
                {idea?.title}
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {idea?.shortDescription}
              </p>

              <Link href={`/ideas/${idea?._id}`}>
                <button className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#1A6FBF] transition-all duration-300 hover:gap-3 hover:text-[#3FA9D4] cursor-pointer">
                  View Details
                  <FaArrowRightLong />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      )}
      
    </div>
  );
};

export default IdeasClient;
