"use client";

import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const { user, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      {user ? (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      ) : (
        <h2 className="text-2xl font-bold">
          <a href="/auth/login">Login</a> to see your profile
        </h2>
      )}
    </main>

  );
}
