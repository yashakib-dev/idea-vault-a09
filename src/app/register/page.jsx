"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
    });
    if (data) {
      redirect("/");
    }
    if (error) {
      toast.error(error.message);
    }

    const isValid =
      user.password.length >= 6 &&
      /[A-Z]/.test(user.password) &&
      /[a-z]/.test(user.password);

    if (!isValid) {
      setError(
        "Password must be 6 or 6+ character with uppercase & lowercase letter",
      );
      return;
    }

    setError("");
  };

      const handleGoogleLogin = async () => {
    const {data} = await authClient.signIn.social({
      provider: "google",
    });

  };


  return (
    <div className="min-h-screen bg-[#F4F9FD] dark:bg-[#0B0B0B] flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#1A6FBF]/20 dark:border-white/5 rounded-3xl shadow-[0_20px_60px_rgba(26,111,191,0.12)] dark:shadow-none p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#1A6FBF] dark:text-[#3FA9D4]">Register</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Create your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF] dark:text-[#3FA9D4]">
                  Name
                </span>
              </label>

              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full rounded-2xl text-black dark:text-white bg-[#F4F9FD] dark:bg-[#2A2A2A] border-black/10 dark:border-white/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white dark:focus:bg-[#2A2A2A] transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF] dark:text-[#3FA9D4]">
                  Email
                </span>
              </label>

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered text-black dark:text-white w-full rounded-2xl bg-[#F4F9FD] dark:bg-[#2A2A2A] border-black/10 dark:border-white/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white dark:focus:bg-[#2A2A2A] transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF] dark:text-[#3FA9D4]">
                  Photo URL
                </span>
              </label>

              <input
                name="image"
                type="url"
                placeholder="https://your-image.com"
                className="input input-bordered text-black dark:text-white w-full rounded-2xl bg-[#F4F9FD] dark:bg-[#2A2A2A] border-black/10 dark:border-white/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white dark:focus:bg-[#2A2A2A] transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF] dark:text-[#3FA9D4]">
                  Password
                </span>
              </label>

              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="input input-bordered w-full text-black dark:text-white rounded-2xl bg-[#F4F9FD] dark:bg-[#2A2A2A] border-black/10 dark:border-white/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white dark:focus:bg-[#2A2A2A] transition-all duration-300"
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

            <div className="divider text-sm py-4 text-gray-400 dark:text-gray-500">OR</div>
              
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-black/10 dark:border-white/10 bg-white dark:bg-[#2A2A2A] hover:bg-[#F4F9FD] dark:hover:bg-[#333333] transition-all duration-300 rounded-2xl py-2 font-medium text-gray-700 dark:text-white/90 hover:cursor-pointer hover:scale-[1.01]"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="text-[#1A6FBF] dark:text-[#3FA9D4] font-semibold hover:text-[#3FA9D4]"
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
