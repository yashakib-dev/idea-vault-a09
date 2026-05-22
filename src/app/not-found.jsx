import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F9FD] dark:bg-[#0B0B0B] flex items-center justify-center px-4">
      <div className="text-center max-w-md  dark:bg-[#1E1E1E] dark:border-white/5 p-10 rounded-3xl shadow-lg border border-black/10">

        <h1 className="text-7xl font-black text-[#1A6FBF]">404</h1>

        <h2 className="text-2xl font-bold mt-4 text-[#1A6FBF]">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-3">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href={"/"}
          className="mt-6 inline-flex items-center gap-2 bg-[#1A6FBF] text-white px-6 py-3 rounded-2xl hover:bg-[#3FA9D4] transition"
        >
          <FaArrowLeft />
          Go Home
        </Link>
      </div>
    </div>
  );
}