import { HiOutlineLightBulb, HiOutlineUserGroup } from "react-icons/hi";
import { FaRocket, FaComments } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Share Your Idea",
    description:
      "Post your startup or project idea with detailed explanations, goals, and vision.",
    icon: <HiOutlineLightBulb className="w-10 h-10" />,
  },
  {
    id: 2,
    title: "Explore Innovations",
    description:
      "Discover creative startup ideas shared by developers, founders, and innovators.",
    icon: <FaRocket className="w-10 h-10" />,
  },
  {
    id: 3,
    title: "Engage & Discuss",
    description:
      "Comment, give feedback, and collaborate with the community to improve ideas.",
    icon: <FaComments className="w-10 h-10" />,
  },
  {
    id: 4,
    title: "Build Together",
    description:
      "Connect with like-minded people and transform concepts into real products.",
    icon: <HiOutlineUserGroup className="w-10 h-10" />,
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-[#F4F9FD] dark:bg-[#0B0B0B] py-24 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold text-[#1A6FBF]">
            How IdeaVault Works
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            IdeaVault helps innovators share, explore, and improve startup ideas
            through collaboration and community engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#d8e8f4] dark:border-white/5 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#1A6FBF]/10 flex items-center justify-center text-[#1A6FBF] mb-6">
                {step.icon}
              </div>

              <span className="text-sm font-semibold text-[#3FA9D4]">
                Step {step.id}
              </span>

              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
