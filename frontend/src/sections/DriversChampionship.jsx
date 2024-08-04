import React, { useState, useEffect } from "react";
import { SectionContainer } from "../components/SectionContainer";
import { TableHeader } from "../components/TableHeader";
import { URL } from "../url.js";
import { Link } from "react-router-dom";

export function DriversChampionship() {
  const STATS_TO_FILTER = [
    "year",
    "position_display_order",
    "driver_id",
    "points",
  ];

  const STATS_LABELS = {
    year: "Year",
    position_display_order: "Position",
    driver_id: "Driver",
    points: "Points",
  };

  const URL_SEASON_DRIVERS_STANDINGS = `${URL}/seasons_drivers_standings/`;

  const [drivers, setDrivers] = useState([]);
  const [distinctYears, setDistinctYears] = useState([]);

  useEffect(() => {
    fetch(URL_SEASON_DRIVERS_STANDINGS)
      .then((response) => response.json())
      .then((data) => {
        setDrivers(data);
        setDistinctYears(getDistinctYears(data));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function getDistinctYears(drivers) {
    const years = drivers.map((driver) => driver.year);
    return [...new Set(years)].sort((a, b) => b - a);
  }

  const driversByYear = distinctYears.map((year) => {
    const driversInYear = drivers.filter((driver) => driver.year === year);

    return (
      <section
        key={year}
        className="flex flex-col w-full border-b-2 border-black/60"
      >
        {" "}
        {driversInYear.map((driver) => (
          <div
            key={driver.driver_id}
            className="flex justify-center w-full mb-1.5"
          >
            {STATS_TO_FILTER.map((stat) => (
              <div
                key={`${driver.driver_id}-${stat}`}
                className="flex-1 text-center text-lg p-1.5"
              >
                {stat === "year" ? (
                  <Link
                    to={`/seasons_drivers_standings/${driver.year}`}
                    className="hover:underline"
                  >
                    {driver[stat].toString().replace(/-/g, " ")}
                  </Link>
                ) : (
                  driver[stat].toString().replace(/-/g, " ")
                )}
              </div>
            ))}
          </div>
        ))}
      </section>
    );
  });

  return (
    <SectionContainer className="w-3/5 mx-auto gap-4">
      <TableHeader
        className="sticky top-0 bg-white border-b-2 border-black/60 z-10"
        stats_labels={STATS_LABELS}
        stats_to_filter={STATS_TO_FILTER}
      />
      {driversByYear}
    </SectionContainer>
  );
}
