import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { URL } from "../url";

const STATS_TO_FILTER = [
  "position_display_order",
  "driver_id",
  "points",
  "difference",
];
const STATS_LABELS = {
  driver_id: "Driver",
  position_display_order: "Position",
  points: "Points",
  difference: "Difference",
};

const URL_SEASON_DRIVERS_STANDINGS = `${URL}/seasons_drivers_standings/`;

export function DriversChampionship() {
  const [drivers, setDrivers] = useState([]);
  const { year } = useParams();

  useEffect(() => {
    fetch(`${URL_SEASON_DRIVERS_STANDINGS}${year}`)
      .then((response) => response.json())
      .then((data) => setDrivers(data));
  }, [year]);

  const maxPoints = Math.max(...drivers.map((driver) => driver.points));

  const statsLabels = STATS_TO_FILTER.map((stat) => (
    <div key={stat} className="flex-1 text-center text-2xl font-bold">
      {STATS_LABELS[stat]}
    </div>
  ));

  const allDrivers = drivers.map((driver) => (
    <div key={driver.driver_id} className="flex justify-center w-full mb-1.5">
      {STATS_TO_FILTER.map((stat) => (
        <div
          key={`${driver.driver_id}-${stat}`}
          className="flex-1 text-center text-lg p-1.5"
        >
          {stat === "difference"
            ? driver["points"] - maxPoints
            : driver[stat].toString().replace(/-/g, " ")}
        </div>
      ))}
    </div>
  ));

  return (
    <main className="flex flex-col items-center justify-center w-3/5 mx-auto">
      <header className="flex justify-center w-full mt-5 h-12">
        {statsLabels}
      </header>
      <section className="flex flex-col items-center w-full">
        {allDrivers}
      </section>
    </main>
  );
}
