import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyIdeasClient from "@/components/MyIdeasClient";

const MyIdeaPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const res = await fetch(
    `http://localhost:5000/my-ideas/${session.user.email}`,
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
