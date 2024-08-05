import React, { useState, useEffect } from "react";
import { URL } from "../url";

const GET_LAST_RACE_RESULTS = `${URL}/races/last_race`;
const STATS_TO_FILTER = ["position_number", "driver_id", "time"];

export function LastRaceResults() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch(GET_LAST_RACE_RESULTS)
      .then((res) => res.json())
      .then((data) => {
        const modified_data = data.map((driver) => {
          return {
            position_number: driver.position_number,
            driver_id: driver.driver_id,
            time: driver.gap ? driver.gap : driver.time,
          };
        });
        setDrivers(modified_data);
      })
      .catch((error) => {
        console.error("Error fetching race results:", error);
      });
  }, []);

  const driverRows = drivers.map((driver) => (
    <div
      key={driver.driver_id}
      className="grid grid-cols-[10%_60%_30%] items-center py-1"
    >
      {STATS_TO_FILTER.map((stat) => (
        <div
          key={stat}
          className={`bg-white py-1
            ${
              stat === "driver_id"
                ? "text-left font-semibold"
                : "text-right pr-3"
            }
            ${stat === "position_number" ? "pl-7" : ""}
          }`}
        >
          {driver[stat].toString().replace(/-/g, " ")}
        </div>
      ))}
    </div>
  ));

  return <div className="w-3/5 max-w-4xl mx-auto">{driverRows}</div>;
}
