"use client";

import Link from "next/link";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#F4F9FD] flex items-center justify-center px-4  ">
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border border-[#1A6FBF]/20 rounded-3xl shadow-[0_20px_60px_rgba(26,111,191,0.12)] p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-[#1A6FBF]">Login</h2>
            <p className="text-gray-500 mt-3">
              Welcome back! Login to continue.
            </p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF]">
                  Email
                </span>
              </label>

              <div className="relative">
                <HiOutlineMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-12 rounded-2xl bg-[#F4F9FD] border-black/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF]">
                  Password
                </span>
              </label>

              <div className="relative">
                <RiLockPasswordLine className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-12 rounded-2xl bg-[#F4F9FD] border-black/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href={"/login"}
                className="text-sm text-[#1A6FBF] hover:text-[#3FA9D4] transition"
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

            <div className="divider px-3 py-6 text-sm text-gray-400">OR</div>

            <button className="w-full flex items-center justify-center gap-3 border border-black/10 bg-white hover:bg-[#F4F9FD] transition-all duration-300 rounded-2xl py-2 font-medium text-gray-700 hover:scale-[1.01] hover:cursor-pointer">
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            Don't have an account?{" "}
            <Link
              href={"/register"}
              className="text-[#1A6FBF] font-semibold hover:text-[#3FA9D4]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
