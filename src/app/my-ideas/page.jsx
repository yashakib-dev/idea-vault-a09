
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-ideas/${session?.user.email}`,
    {
      cache: "no-store",
    },
  );

  const ideas = await res.json();
  console.log(ideas);

  return (
   <MyIdeasClient ideas={ideas}></MyIdeasClient>
  
  );
};

export default MyIdeaPage;
