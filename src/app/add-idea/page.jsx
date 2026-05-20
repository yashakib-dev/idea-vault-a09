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
    const res = await fetch("http://localhost:5000/ideas", {
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
    <div className="min-h-screen bg-[#F4F9FD] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="lg:text-5xl md:text-4xl my-5 text-3xl font-bold text-[#1A6FBF]">
            Submit Your Startup Idea
          </h2>

          <p className="text-gray-600 mt-3">
            Share your innovative idea with the community.
          </p>
        </div>

        <div className="card bg-[#F4F9FD] shadow-xl p-6 rounded-2xl border border-[#d8e8f4]">
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
                  className="input rounded-3xl input-bordered w-full bg-white focus:outline-none focus:border-[#3FA9D4]"
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
                  className="textarea rounded-3xl textarea-bordered w-full bg-white min-h-[100px] focus:outline-none focus:border-[#3FA9D4]"
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
                  className="textarea rounded-3xl textarea-bordered w-full bg-white min-h-[160px] focus:outline-none focus:border-[#3FA9D4]"
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
                    className="select rounded-3xl select-bordered w-full bg-white focus:outline-none focus:border-[#3FA9D4]"
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
                    className="input rounded-3xl input-bordered w-full bg-white focus:outline-none focus:border-[#3FA9D4]"
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
                  className="input input-bordered rounded-3xl w-full bg-white focus:outline-none focus:border-[#3FA9D4]"
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
                  className="input input-bordered w-full rounded-3xl bg-white focus:outline-none focus:border-[#3FA9D4]"
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
                  className="textarea textarea-bordered rounded-3xl w-full bg-white min-h-[100px] focus:outline-none focus:border-[#3FA9D4]"
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
                  className="textarea rounded-3xl textarea-bordered w-full bg-white min-h-[120px] focus:outline-none focus:border-[#3FA9D4]"
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
                  className="textarea rounded-3xl textarea-bordered w-full bg-white min-h-[140px] focus:outline-none focus:border-[#3FA9D4]"
                  value={formData.proposedSolution}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-4 ">
                <button
                  type="submit"
                  className="btn w-full rounded-3xl border-none text-white bg-[#1A6FBF] hover:bg-[#3FA9D4] hover:cursor-pointer transition-all duration-300"
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
