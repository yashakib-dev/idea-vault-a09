import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return NextResponse.next();
  }
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", request.url);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/add-idea", "/ideas/:id", "/my-ideas", "/my-interactions"],
};
