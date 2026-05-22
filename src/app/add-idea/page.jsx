"use client";

import { useSession } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

const categories = [
  "Tech",
  "Health",
  "AI",
  "Education",
  "Finance",
  "E-Commerce",
  "Social",
  "Environment",
];

const StartupIdeaForm = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    category: "Tech",
    tags: "",
    imageURL: "",
    budget: "",
    targetAudience: "",
    problemStatement: "",
    proposedSolution: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const idea = {
      ...Object.fromEntries(formData.entries()),
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      createdAt: new Date().toISOString(),
    };
    console.log(formData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idea),
    });
    const data = await res.json();
    toast.success("Idea added successfully!");
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-[#F4F9FD] dark:bg-[#0B0B0B] py-10 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center ">
          <h2 className="lg:text-5xl md:text-4xl my-5 text-3xl font-bold text-[#1A6FBF]">
            Submit Your Startup Idea
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-3">
            Share your innovative idea with the community.
          </p>
        </div>

        <div className="card bg-white dark:bg-[#1E1E1E] shadow-xl p-6 rounded-2xl border border-[#d8e8f4] dark:border-white/5">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Idea Title
                  </span>
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Enter startup idea title"
                  className="input rounded-3xl shadow text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 w-full focus:outline-none focus:border-[#3FA9D4]"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Short Description
                  </span>
                </label>

                <textarea
                  name="shortDescription"
                  placeholder="Write a short summary"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 shadow rounded-3xl w-full min-h-[100px] focus:outline-none focus:border-[#3FA9D4]"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Detailed Description
                  </span>
                </label>

                <textarea
                  name="detailedDescription"
                  placeholder="Explain your startup idea in detail"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 shadow rounded-3xl w-full min-h-[160px] focus:outline-none focus:border-[#3FA9D4]"
                  value={formData.detailedDescription}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">
                    <span className="label-text text-[#1A6FBF] font-semibold">
                      Category
                    </span>
                  </label>

                  <select
                    name="category"
                    className="select text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl shadow w-full focus:outline-none focus:border-[#3FA9D4]"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text  text-[#1A6FBF] font-semibold">
                      Estimated Budget
                    </span>
                  </label>

                  <input
                    type="number"
                    name="budget"
                    placeholder="$5000"
                    className="input text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl shadow w-full focus:outline-none focus:border-[#3FA9D4]"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Tags
                  </span>
                </label>

                <input
                  type="text"
                  name="tags"
                  placeholder="AI, SaaS, Startup, Mobile App"
                  className="input text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 shadow rounded-3xl w-full focus:outline-none focus:border-[#3FA9D4]"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Image URL
                  </span>
                </label>

                <input
                  type="url"
                  name="imageURL"
                  placeholder="https://yourimage/image.jpg"
                  className="input text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 shadow w-full rounded-3xl focus:outline-none focus:border-[#3FA9D4]"
                  value={formData.imageURL}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Target Audience
                  </span>
                </label>

                <textarea
                  name="targetAudience"
                  placeholder="Who will use this product?"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 shadow rounded-3xl w-full min-h-[100px] focus:outline-none focus:border-[#3FA9D4]"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Problem Statement
                  </span>
                </label>

                <textarea
                  name="problemStatement"
                  placeholder="What problem are you solving?"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 rounded-3xl shadow w-full min-h-[120px] focus:outline-none focus:border-[#3FA9D4]"
                  value={formData.problemStatement}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-[#1A6FBF] font-semibold">
                    Proposed Solution
                  </span>
                </label>

                <textarea
                  name="proposedSolution"
                  placeholder="Describe your proposed solution"
                  className="textarea text-black dark:text-white bg-white dark:bg-[#2A2A2A] border border-black/10 dark:border-white/10 shadow rounded-3xl w-full min-h-[140px] focus:outline-none focus:border-[#3FA9D4]"
                  value={formData.proposedSolution}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-4 ">
                <button
                  type="submit"
                  className="btn w-full rounded-3xl border-none text-white bg-[#1A6FBF] hover:bg-[#3FA9D4] hover:cursor-pointer transition-all duration-300 font-bold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StartupIdeaForm;
