import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyInteractionsClient from "@/components/MyInteractionsClient";

export const metadata = {
  title: "My Interactions",
};

const MyInteractionsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-comments/${session?.user?.email}`,
    {
      cache: "no-store",
    },
  );

  const comments = await res.json();

  return <MyInteractionsClient initialComments={comments} />;
};

export default MyInteractionsPage;

