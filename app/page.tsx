"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-4xl space-y-8 text-center">
        <h1 className="text-4xl font-bold">Welcome to Merchant Collab</h1>
          <div className="mt-8 pt-8 border-t">
            <h2 className="text-2xl font-semibold mb-4">Are you a merchant?</h2>
            <a 
              href="/merchant"
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 inline-block"
            >
              Access Merchant Portal
            </a>
          </div>
      </div>
    </main>
  );
}
