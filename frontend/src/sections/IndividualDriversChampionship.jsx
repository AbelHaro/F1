import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { URL } from "../url";
import { TableHeader } from "../components/TableHeader";
import { SectionContainer } from "../components/SectionContainer";

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

export function IndividualDriversChampionship() {
  const [drivers, setDrivers] = useState([]);
  const { year } = useParams();

  useEffect(() => {
    fetch(`${URL_SEASON_DRIVERS_STANDINGS}${year}`)
      .then((response) => response.json())
      .then((data) => setDrivers(data));
  }, [year]);

  const maxPoints = Math.max(...drivers.map((driver) => driver.points));

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
    <SectionContainer className="w-3/5">
      <TableHeader
        stats_labels={STATS_LABELS}
        stats_to_filter={STATS_TO_FILTER}
      />
      <section className="flex flex-col items-center w-full">
        {allDrivers}
      </section>
    </SectionContainer>
  );
}
