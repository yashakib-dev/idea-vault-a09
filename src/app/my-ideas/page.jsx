
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyIdeasClient from "@/components/MyIdeasClient";

export const metadata = {
  title: "My Ideas",
};
const MyIdeaPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let ideas = [];
  if (session?.user?.email) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas/${session.user.email}`,
        { cache: "no-store" },
      );
      if (res.ok) {
        const data = await res.json();
        ideas = Array.isArray(data) ? data : [];
      }
    } catch {
      // API unavailable
    }
  }

  return (
   <MyIdeasClient ideas={ideas}></MyIdeasClient>
  
  );
};

export default MyIdeaPage;
