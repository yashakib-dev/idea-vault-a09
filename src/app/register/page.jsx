"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    const isValid =
      password.length >= 6 && /[A-Z]/.test(password) && /[a-z]/.test(password);

    if (!isValid) {
      setError(
        "Password must be 6+ character with uppercase & lowercase letter",
      );
      return;
    }

    setError("");

    console.log({ name, email, photo, password });
  };

  return (
    <div className="min-h-screen bg-[#F4F9FD] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#1A6FBF]/20 rounded-3xl shadow-[0_20px_60px_rgba(26,111,191,0.12)] p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#1A6FBF]">Register</h2>
            <p className="text-gray-500 mt-3">
              Create your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF]">
                  Name
                </span>
              </label>

              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full rounded-2xl bg-[#F4F9FD] border-black/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF]">
                  Email
                </span>
              </label>

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full rounded-2xl bg-[#F4F9FD] border-black/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF]">
                  Photo URL
                </span>
              </label>

              <input
                name="photo"
                type="url"
                placeholder="https://your-image.com"
                className="input input-bordered w-full rounded-2xl bg-[#F4F9FD] border-black/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF]">
                  Password
                </span>
              </label>

              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="input input-bordered w-full rounded-2xl bg-[#F4F9FD] border-black/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              className="btn w-full border-0 bg-[#1A6FBF] text-white rounded-2xl hover:bg-[#3FA9D4] hover:scale-[1.01] transition-all duration-300"
            >
              Register
            </button>

            <div className="divider text-sm py-4 text-gray-400">OR</div>

            <button className="w-full flex items-center justify-center gap-3 border border-black/10 bg-white hover:bg-[#F4F9FD] transition-all duration-300 rounded-2xl py-2 font-medium text-gray-700 hover:cursor-pointer hover:scale-[1.01]">
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-[#1A6FBF] font-semibold hover:text-[#3FA9D4]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
