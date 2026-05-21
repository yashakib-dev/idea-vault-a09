"use client";

import { Suspense, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import LoginClient from "@/components/LoginClient";

const LoginPageContent = () => {
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    const isValid =
      user.password.length >= 6 &&
      /[A-Z]/.test(user.password) &&
      /[a-z]/.test(user.password);

    if (!isValid) {
      setError(
        "Password must be 6 or 6+ character with uppercase & lowercase letter"
      );
      return;
    }

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true,
      callbackURL: callbackUrl || "/",
    });

    if (data) {
      toast.success("Login successful");
      router.push(callbackUrl || "/");
    }

    if (error) {
      toast.error(error.message);
    }

    setError("");
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl || "/",
    });
  };

  return (
    <LoginClient
      handleSubmit={handleSubmit}
      handleGoogleLogin={handleGoogleLogin}
      error={error}
    />
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
};

export default LoginPage;