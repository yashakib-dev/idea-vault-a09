"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const LoginClient = ({
  handleSubmit,
  handleGoogleLogin,
  error,
}) => {
  return (
    <div className="min-h-screen bg-[#F4F9FD] dark:bg-[#0B0B0B] flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#1A6FBF]/20 dark:border-white/5 rounded-3xl shadow-[0_20px_60px_rgba(26,111,191,0.12)] dark:shadow-none p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#1A6FBF] dark:text-[#3FA9D4]">
              Login
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-3">
              Welcome back! Login to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF] dark:text-[#3FA9D4]">
                  Email
                </span>
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full rounded-2xl bg-[#F4F9FD] dark:bg-[#2A2A2A] border-black/10 dark:border-white/10 focus:outline-none focus:border-[#3FA9D4] text-black dark:text-white focus:bg-white dark:focus:bg-[#2A2A2A] transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF] dark:text-[#3FA9D4]">
                  Password
                </span>
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full text-black dark:text-white rounded-2xl bg-[#F4F9FD] dark:bg-[#2A2A2A] border-black/10 dark:border-white/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white dark:focus:bg-[#2A2A2A] transition-all duration-300"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">
                {error}
              </p>
            )}

            <div className="flex justify-end">
              <Link
                href="/login"
                className="text-sm text-[#1A6FBF] dark:text-[#3FA9D4] hover:text-[#3FA9D4] transition"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn w-full border-0 bg-[#1A6FBF] text-white rounded-2xl hover:bg-[#3FA9D4] hover:scale-[1.01] transition-all duration-300"
            >
              Login
            </button>

            <div className="divider px-3 py-6 text-sm text-gray-400 dark:text-gray-500">
              OR
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-black/10 dark:border-white/10 bg-white dark:bg-[#2A2A2A] hover:bg-[#F4F9FD] dark:hover:bg-[#333333] transition-all duration-300 rounded-2xl py-2 font-medium text-gray-700 dark:text-white/90 hover:scale-[1.01] hover:cursor-pointer"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#1A6FBF] dark:text-[#3FA9D4] font-semibold hover:text-[#3FA9D4]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;