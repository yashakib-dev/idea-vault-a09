import Link from "next/link";
import React from "react";
import NavLinks from "./NavLinks";
import { RiHome2Line } from "react-icons/ri";
import { PiBrain } from "react-icons/pi";

const Navbar = () => {


  return (
    <div className="bg-[#F4F9FD] shadow-sm">
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
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/idea">Idea</Link>
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
              <NavLinks href="/">
                <RiHome2Line />
                Home
              </NavLinks>
            </li>
            <li>
              <NavLinks href="/idea">
                <PiBrain className="w-4 h-4" />
                Idea
              </NavLinks>
            </li>
            
          </ul>
        </div>

        <div className="navbar-end lg:flex">
          <div className="flex lg:gap-3 gap-2">


              <div className="flex lg:gap-2 md:gap-2 items-center">
                <Link
                  href={"/login"}
                  className="lg:btn md:btn rounded-3xl w-16  lg:w-25 lg:h-10 font-bold bg-transparent  text-black "
                >
                  Login
                </Link>
                <Link
                  href={"/register"}
                  className="lg:btn md:btn border-0 lg:bg-[#1A6FBF] md:bg-[#1A6FBF] font-bold lg:text-white md:text-white rounded-3xl"
                >
                  Register
                </Link>
              </div>
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
