"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const IdeasClient = ({ initialIdeas }) => {
  const [ideas, setIdeas] = useState(initialIdeas);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchIdeas = async () => {
    const res = await fetch(
      `http://localhost:5000/all-ideas?search=${search}&category=${category}`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    setIdeas(data);
  };

  useEffect(() => {
    fetchIdeas();
  }, [search, category]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search ideas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered focus:outline-none w-full rounded-2xl"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered focus:outline-none  rounded-2xl"
        >
          <option>All</option>
          <option>Tech</option>
          <option>AI</option>
          <option>Health</option>
          <option>Education</option>
          <option>Finance</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea._id}
           className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-[0_20px_50px_rgba(26,111,191,0.12)] hover:-translate-y-2  transition-all duration-300 ease-out"
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
                {idea.category}
              </span>

              <h3 className="text-lg font-bold line-clamp-1">
                {idea?.title}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2">
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
    </div>
  );
};

export default IdeasClient;