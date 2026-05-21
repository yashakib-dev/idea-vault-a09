import IdeasClient from "@/components/IdeasClient";

export const metadata = {
  title: "Ideas",
};

const IdeaPage = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all-ideas`, {
    cache: "no-store",
  });

  const ideas = await res.json();

  return (
    <div className="bg-[#F4F9FD] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-[#1A6FBF]">All Ideas</h2>
        </div>

        <IdeasClient initialIdeas={ideas} />
      </div>
    </div>
  );
};

export default IdeaPage;
