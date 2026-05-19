import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";


const TrendingIdeas = async () => {
  const res = await fetch("http://localhost:5000/ideas", {
    cache: "no-store",
  });

  const ideas = await res.json();

  return (
    <div className="bg-[#F4F9FD] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">

          <h2 className="text-4xl font-bold text-[#1A6FBF]">
            Discover Trending Ideas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-[0_20px_50px_rgba(26,111,191,0.12)] hover:-translate-y-2  transition-all duration-300 ease-out"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

              <div className="overflow-hidden">
                <Image
                  src={idea.imageURL}
                  alt={idea.title}
                  width={800}
                  height={600}
                  className="h-52 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </div>

              <div className="relative z-10 p-5 space-y-3">
                <div>
                  <span className="inline-flex items-center rounded-full bg-[#1A6FBF]/10 px-3 py-1 text-xs font-semibold text-[#1A6FBF]">
                    {idea.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                  {idea.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {idea.shortDescription}
                </p>

                <Link href={`/ideas/${idea._id}`}>
                  <button className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#1A6FBF] transition-all duration-300 hover:gap-3 hover:text-[#3FA9D4] cursor-pointer">
                    View Details
                    <FaArrowRightLong />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingIdeas;