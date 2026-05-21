import Hero from "@/components/homepage/Hero";
import HowItWorks from "@/components/homepage/HowItWorks";
import ReadyToShare from "@/components/homepage/ReadyToShare";
import TrendingIdeas from "@/components/homepage/TrendingIdeas";

export default function Home() {
  return (
    <div>
      <main>
        <Hero></Hero>
        <TrendingIdeas></TrendingIdeas>
        <HowItWorks></HowItWorks>
        <ReadyToShare></ReadyToShare>
      </main>
    </div>
  );
}
