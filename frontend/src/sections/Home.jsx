import React from "react";

export function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center">Welcome to F1 Stats</h1>
      <p className="text-center mt-4">
        This is a simple app to show some stats about Formula 1.
      </p>
      <img src="/1.webp" alt="F1" className="w-3/5 h-3/5" />
    </main>
  );
}
