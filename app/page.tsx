"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { handleSubmit } from './actions';

export default function Home() {
  const { user, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      {user ? (
        <>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <form action={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              className="border border-gray-300 rounded px-2 py-1 mr-2"
              placeholder="Enter your name"
            />
            <button 
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <h2 className="text-2xl font-bold">
          <a href="/auth/login">Login</a> to see your profile
        </h2>
      )}
    </main>
  );
}
