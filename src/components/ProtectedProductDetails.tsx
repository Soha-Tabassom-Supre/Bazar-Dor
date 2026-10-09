"use client";

import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function ProtectedProductDetails({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      const callbackURL = window.location.pathname;
      router.replace(`/sign-in?callbackURL=${encodeURIComponent(callbackURL)}`);
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <main className="min-h-screen bg-white p-8 text-center text-gray-600">
        পণ্যের তথ্য লোড হচ্ছে...{" "}
      </main>
    );
  }

  return <>{children}</>;
}
