"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const isValid =
      user.password.length >= 8 &&
      /[A-Z]/.test(user.password) &&
      /[a-z]/.test(user.password);

    if (!isValid) {
      setError(
        "Password must be 8 or 8+ character with uppercase & lowercase letter",
      );
      return;
    }

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
    console.log(data);

    if (data) {
      toast.success("Login successful");
      router.push("/");
    }
    if (error) {
      toast.error(error.message);
    }

    setError("");
  };
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text font-semibold text-[#1A6FBF]">
                  Email
                </span>
              </label>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full rounded-2xl bg-[#F4F9FD] border-black/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white transition-all duration-300"
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

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full rounded-2xl bg-[#F4F9FD] border-black/10 focus:outline-none focus:border-[#3FA9D4] focus:bg-white transition-all duration-300"
                  required
                />
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

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
