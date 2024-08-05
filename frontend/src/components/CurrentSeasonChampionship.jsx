import React, { useState, useEffect } from "react";
import { URL } from "../url";

const GET_CURRENT_SEASON_CHAMPIONSHIP = `${URL}/seasons_drivers_standings/current_year`;
const STATS_TO_FILTER = [
  "position_display_order",
  "driver_id",
  "constructor_id",
  "points",
  "difference",
];
const STATS_LABELS = {
  position_display_order: "Position",
  driver_id: "Driver",
  constructor_id: "Constructor",
  points: "Points",
  difference: "Difference",
};

export function CurrentSeasonChampionship() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch(GET_CURRENT_SEASON_CHAMPIONSHIP)
      .then((res) => res.json())
      .then((data) => {
        const max_points = Math.max(...data.map((driver) => driver.points));
        const modified_data = data.map((driver) => {
          return {
            ...driver,
            difference: driver.points - max_points,
          };
        });
        setDrivers(modified_data);
      });
  }, []);

  const labels = STATS_TO_FILTER.map((label) => (
    <div key={label} className="text-left font-bold my-1 p-1 pl-10 bg-white">
      {STATS_LABELS[label]}
    </div>
  ));

  const driverRows = drivers.map((driver) => (
    <div
      key={driver.driver_id}
      className="grid"
      style={{
        gridTemplateColumns: "14% 25% 20% 12% 20%",
      }}
    >
      {STATS_TO_FILTER.map((label) => (
        <div
          key={label}
          className={`text-left my-1 p-1 pl-10 bg-white ${
            label === "driver_id" ? "font-semibold" : ""
          }`}
        >
          {driver[label].toString().replace(/-/g, " ")}
        </div>
      ))}
    </div>
  ));

  return (
    <div className="w-full max-w-3xl mx-auto">
      <header
        className="grid"
        style={{
          gridTemplateColumns: "14% 25% 20% 12% 20%",
        }}
      >
        {labels}
      </header>
      {driverRows}
    </div>
  );
}
