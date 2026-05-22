import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";

const ReadyToShare = () => {
  return (
    <div className="bg-[#F4F9FD] dark:bg-[#0B0B0B] py-24 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#1A6FBF] to-[#3FA9D4] p-10 md:p-16 shadow-[0_20px_60px_rgba(26,111,191,0.25)]">
          
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-col items-center justify-between gap-10">
            
        
            <div className="max-w-4xl text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <HiOutlineLightBulb className="w-5 h-5" />
                Startup Community
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Ready to share your idea?
              </h2>

              <p className="text-white/80 mt-5 text-lg leading-relaxed">
                Turn your innovation into inspiration. Share your startup idea,
                receive valuable feedback, and connect with passionate creators
                from around the world.
              </p>
            </div>

         
            <div className="flex flex-col sm:flex-row gap-4">
              
              <Link href="/add-idea">
                <button className="bg-white text-[#1A6FBF] px-7 py-4 rounded-2xl font-bold hover:bg-[#F4F9FD] transition-all hover:cursor-pointer duration-300 flex items-center gap-3 hover:gap-4">
                  Submit Idea
                  <FaArrowRightLong />
                </button>
              </Link>

              <Link href="/ideas">
                <button className="border hover:cursor-pointer border-white/30 text-white px-7 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">
                  Explore Ideas
                </button>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyToShare;