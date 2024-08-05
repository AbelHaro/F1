import React from "react";
import { CurrentSeasonChampionship } from "../components/CurrentSeasonChampionship";
import { LastRaceResults } from "../components/LastRaceResults";

export function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-center">Welcome to F1 Stats</h1>
      <p className="text-center mt-4">
        This is a simple app to show some stats about Formula 1.
      </p>
      <section className="mt-8 flex flex-row justify-between w-full px-60 md:px-8 lg:px-16 gap-8">
        <div className="flex-1 text-f1-red">
          <CurrentSeasonChampionship />
        </div>
        <div className="flex-1">
          <LastRaceResults />
        </div>
      </section>
    </main>
  );
}
