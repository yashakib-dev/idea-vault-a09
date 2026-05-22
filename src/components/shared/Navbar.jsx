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
import ThemeToggle from "../ThemeToggle";
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
    <div className="bg-white dark:bg-[#0B0B0B] text-black dark:text-white transition-colors duration-300">
      <div className="border-b border-gray-200 dark:border-white/10 shadow-sm">
        <div className="navbar container mx-auto py-5 ">
          <div className="navbar-start">
            <div className="dropdown">
              <label
                tabIndex={0}
                className="btn btn-ghost text-black dark:text-white lg:hidden"
              >
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
                className="menu menu-sm dropdown-content bg-white dark:bg-[#1E1E1E] text-black dark:text-white font-semibold rounded-box z-10 mt-3 w-52 p-2 shadow border border-black/10 dark:border-white/10"
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

            <h2 className="hidden lg:block font-bold lg:text-4xl text-3xl text-[#1A6FBF]">
              Idea<span className="text-[#3FA9D4]">Vault</span>
            </h2>
          </div>

          <div className={"navbar-center hidden lg:flex"}>
            <ul className="menu font-semibold gap-2 text-black dark:text-white rounded-md menu-horizontal px-1">
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
            <div className="navbar-end relative z-50">
              <div className="flex items-center gap-3">
                <ThemeToggle />

                {user ? (
                  <>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="cursor-pointer"
                      >
                        <Image
                          src={
                            user?.image ||
                            "https://i.ibb.co.com/xqykWXq5/avatar-15.png"
                          }
                          alt="Profile"
                          width={42}
                          height={42}
                          className="rounded-full object-cover h-10 w-10 border border-[#1A6FBF]"
                        />
                      </div>

                      <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-3 w-60 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1E1E1E] text-black dark:text-white shadow-xl p-3 space-y-2"
                      >
                        <div className="px-2 py-2 border-b border-black/10 dark:border-white/10">
                          <h2 className="font-bold text-[#1A6FBF]">
                            {user?.name}
                          </h2>

                          <p className="text-sm text-gray-500 dark:text-gray-400 break-all">
                            {user?.email}
                          </p>
                        </div>

                        <li>
                          <Link href="/profile" className="text-black dark:text-white/90 hover:text-[#1A6FBF] dark:hover:text-[#3FA9D4]">My Profile</Link>
                        </li>

                        <li>
                          <Link href="/my-ideas" className="text-black dark:text-white/90 hover:text-[#1A6FBF] dark:hover:text-[#3FA9D4]">My Ideas</Link>
                        </li>

                        <li>
                          <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-600 w-full text-left"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-2 items-center">
                      <Link
                        href={"/login"}
                        className="btn lg:text-[16px] md:text-[16px] text-sm rounded-3xl border border-black/20 dark:border-white/20 bg-transparent text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        Login
                      </Link>

                      <Link
                        href={"/register"}
                        className=" btn lg:text-[16px] md:text-[16px] text-sm border-0 bg-[#1A6FBF] text-white rounded-3xl hover:bg-[#3FA9D4]"
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
      </div>
    </div>
  );
};

export default Navbar;
