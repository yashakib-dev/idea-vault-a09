import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F9FD] flex items-center justify-center px-4">
      <div className="text-center max-w-md bg-white p-10 rounded-3xl shadow-lg border border-black/10">

        <h1 className="text-7xl font-black text-[#1A6FBF]">404</h1>

        <h2 className="text-2xl font-bold mt-4 text-gray-800">
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