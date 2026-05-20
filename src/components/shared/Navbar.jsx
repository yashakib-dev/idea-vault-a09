"use client";
import Link from "next/link";
import React from "react";
import NavLinks from "./NavLinks";
import { RiHome2Line, RiUserSettingsLine } from "react-icons/ri";
import { PiBrain } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineLightBulb } from "react-icons/hi";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(session);
  
    const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <div className="bg-[#F4F9FD] border border-gray-300 shadow-sm">
      <div className="navbar container mx-auto py-5 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content font-semibold bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLinks href={"/"}>
                  <RiHome2Line />
                  Home
                </NavLinks>
              </li>
              <li>
                <NavLinks href={"/ideas"}>
                  <PiBrain className="w-4 h-4" />
                  Ideas
                </NavLinks>
              </li>
              <li>
                <NavLinks href={"/add-idea"}>
                  <IoMdAdd className="w-4 h-4" />
                  Add Idea
                </NavLinks>
              </li>
              <li>
                <NavLinks href={"/my-ideas"}>
                  <HiOutlineLightBulb className="w-4 h-4" />
                  My Ideas
                </NavLinks>
              </li>
              <li>
                <NavLinks href={"/my-interactions"}>
                  <RiUserSettingsLine className="w-4 h-4" />
                  My Interactions
                </NavLinks>
              </li>
            </ul>
          </div>

          <h2 className="font-bold lg:text-4xl text-3xl text-[#1A6FBF] ">
            Idea<span className="text-[#3FA9D4]">Vault</span>
          </h2>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu font-semibold gap-2  text-white rounded-md menu-horizontal px-1">
            <li>
              <NavLinks href={"/"}>
                <RiHome2Line />
                Home
              </NavLinks>
            </li>
            <li>
              <NavLinks href={"/ideas"}>
                <PiBrain className="w-4 h-4" />
                Ideas
              </NavLinks>
            </li>
            <li>
              <NavLinks href={"/add-idea"}>
                <IoMdAdd className="w-4 h-4" />
                Add Idea
              </NavLinks>
            </li>
            <li>
              <NavLinks href={"/my-ideas"}>
                <HiOutlineLightBulb className="w-4 h-4" />
                My Ideas
              </NavLinks>
            </li>
            <li>
              <NavLinks href={"/my-interactions"}>
                <RiUserSettingsLine className="w-4 h-4" />
                My Interactions
              </NavLinks>
            </li>
          </ul>
        </div>

        <div className="navbar-end lg:flex">
          <div className="flex lg:gap-3 gap-2">
            {user ? (
              <>
              <div className="flex items-center lg:gap-3 gap-2">
              
                <Image
                  src={user?.image || "https://i.ibb.co.com/xqykWXq5/avatar-15.png"}
                  alt="Profile"
                  width={42}
                  height={42}
                  className="rounded-full mx-auto object-cover h-10 w-10 border hover:cursor-pointer border-[#1A6FBF]"
                />
                
                <button
                  onClick={handleLogout}
                  className="lg:btn md:btn border-0 lg:bg-[#1A6FBF] md:bg-[#1A6FBF] font-bold lg:text-white hover:bg-[#3FA9D4] hover:cursor-pointer md:text-white rounded-3xl "
                >
                  Logout
                </button>
              </div>
              </>
            ) : (
              <>
                <div className="flex lg:gap-2 md:gap-2 items-center">
                  <Link
                    href={"/login"}
                    className="lg:btn md:btn rounded-3xl w-16 lg:border border-black/30 lg:w-25 lg:h-10 font-bold bg-transparent  text-black "
                  >
                    Login
                  </Link>
                  <Link
                    href={"/register"}
                    className="lg:btn md:btn border-0 lg:bg-[#1A6FBF] md:bg-[#1A6FBF] font-bold lg:text-white hover:bg-[#3FA9D4] hover:cursor-pointer md:text-white rounded-3xl"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
