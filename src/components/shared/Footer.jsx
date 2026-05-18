import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import { TbBrandInstagramFilled } from "react-icons/tb";

const Footer = () => {
  return (
    <div>
      <footer className=" bg-[#0d1b2a] pt-16 py-20  px-6 md:px-12 lg:px-20">
        <div className="footer text-[white] lg:footer-horizontal container items-center mx-auto py-6 p-10">
          <div>
            <h2 className="text-4xl font-bold">IdeaVault</h2>
            <p className="w-70 font-light text-[#ffffffab]">
              IdeaVault is a web-based platform where users can share innovative
              startup ideas, explore ideas posted by others, and engage through
              comments.
            </p>
          </div>
          <nav className="font-light text-[#ffffffab]">
            <h6 className=" text-[#FFFFFF] font-bold text-2xl">Platform links</h6>
            <a className="link link-hover">Ideas</a>
            <a className="link link-hover">Categories</a>
            <a className="link link-hover">Templates</a>
            <a className="link link-hover">Integrations</a>
          </nav>
          <nav className="font-light text-[#ffffffab]">
            <h6 className="text-[#FFFFFF] font-bold text-2xl">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Blog</a>
            <a className="link link-hover">Careers</a>
            <a className="link link-hover">Press</a>
          </nav>
          <nav className="font-light text-[#ffffffab]">
            <h6 className="text-[#FFFFFF] font-bold text-2xl">Resources</h6>
            <a className="link link-hover">Contact info</a>
            <a className="link link-hover">Help Center</a>
            <a className="link link-hover">Community</a>
            <a className="link link-hover">Documentation</a>
          </nav>
          <nav>
            <h6 className="footer-title">Social Links</h6>
            <div className="grid grid-flow-col gap-4 ">
              <a>
                <TbBrandInstagramFilled className="bg-[#ffffff] rounded-full text-black w-10 h-10 p-2 " />
              </a>
              <a>
                <FaSquareFacebook className="bg-[#ffffff] rounded-full text-black w-10 h-10 p-2 " />
              </a>
              <a>
                <BsTwitterX className="bg-[#ffffff] rounded-full text-black w-10 h-10 p-2 " />
              </a>
            </div>
          </nav>
        </div>

        <div className="border-t border-white/25 my-6 "></div>

        <div className="text-[#ffffffab] md:flex space-y-4 justify-between container mx-auto px-8">
          <p>© 2026 IdeaVault. All rights reserved.</p>
          <div className="flex md:text-md text-sm gap-6 px-4">
            <a href="">Privacy Policy</a>
            <a href="">Terms of Service</a>
            <a href="">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
