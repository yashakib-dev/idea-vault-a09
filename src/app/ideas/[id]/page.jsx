import Comments from "@/components/ui/Comments";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export const metadata = {
  title: "Idea Details",
};

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;

  const token =await auth.api.getToken({
    headers: await headers(),
  });
  

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`,{
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const ideas = await res.json();
  

  const {
    title,
    imageURL,
    proposedSolution,
    problemStatement,
    targetAudience,
    tags,
    budget,
    detailedDescription,
    shortDescription,
  } = ideas;
  return (
    <div className="bg-[#F4F9FD] dark:bg-[#0B0B0B] py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <Link
          href={"/ideas"}
          className="flex btn w-fit rounded-3xl bg-[#1A6FBF]/10 text-[#1A6FBF] items-center gap-2 my-5"
        >
          <FaArrowLeftLong />
          Back to all ideas{" "}
        </Link>

        <div className="relative">
          <Image
            src={imageURL}
            alt={title}
            width={1400}
            height={800}
            className="w-full lg:h-120 object-cover rounded-2xl"
          ></Image>
          <div className="space-y-5">
            <p className="inline-flex absolute top-5 md:right-10 right-5 items-center rounded-full bg-[#1A6FBF] md:px-6 px-4 py-1 md:py-2 text-xs font-semibold text-[white] ">
            {tags}
          </p>
          <h2 className="text-4xl mt-6 text-[#1A6FBF] font-bold">{title}</h2>
          <p className="text-black/50 dark:text-white/60">{shortDescription}</p>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-evenly">
            
            <span className="border p-10 shadow-lg text-center bg-white dark:bg-[#1E1E1E] rounded-2xl border-black/20 dark:border-white/10 w-full ">
            <p className="font-bold text-[#1A6FBF]">Target Audience</p>
            <p className="text-black/50 dark:text-white/60">{targetAudience}</p>
            </span>

            <span className=" p-9 border shadow-lg text-center bg-white dark:bg-[#1E1E1E] rounded-2xl border-black/20 dark:border-white/10 w-full  ">
            <p className="font-bold text-[#1A6FBF]">Estimated Budget</p>
            <p className="text-2xl text-black/50 dark:text-white/80"> ${budget}</p></span>
          </div>

          
            <div>
              <p className="font-bold text-xl text-[#1A6FBF]"> Problem Statement</p>
              <p className="text-black/50 dark:text-white/60">{problemStatement}</p>
            </div>

            <div>
              <p className="font-bold text-xl text-[#1A6FBF]"> Proposed Solution</p>
              <p className="text-black/50 dark:text-white/60">{proposedSolution}</p>
            </div>

            <div >
              <p className="font-bold text-xl text-[#1A6FBF]">Detailed Description</p>
              <p className="text-black/50 dark:text-white/60">{detailedDescription}</p>
            </div>

          </div>
        </div>
      </div>

      <Comments></Comments>

    </div>
  );
};

export default IdeaDetailsPage;
