import React from "react";
import { useEffect, useState } from "react";
import { URL } from "../url.js";
import PropTypes from "prop-types";

// Stats to filter
const STATS_TO_FILTER = [
  "name",
  "nationality_country_id",
  "date_of_birth",
  "total_race_wins",
  "total_podiums",
];
const SPECIAL_STATS_TO_FILTER = ["total_race_wins", "total_podiums"];
const STATS_LABELS = {
  name: "Name",
  nationality_country_id: "Nationality",
  date_of_birth: "Date of Birth",
  total_race_wins: "Race Wins",
  total_podiums: "Podiums",
};

const URL_SEARCH_BY_NATIONALITY = `${URL}/drivers/nationalities/`;
const URL_SEARCH_BY_NAME = `${URL}/drivers/names/`;
const GO_TO_INDIVIDUAL_DRIVER = `${URL}/drivers/`;

DriverStats.propTypes = {
  selectedNationality: PropTypes.string.isRequired,
  selectedName: PropTypes.string.isRequired,
};

export function DriverStats({ selectedNationality, selectedName }) {
  const [driverStats, setDriverStats] = useState([]);

  useEffect(() => {
    if (selectedNationality.length > 0) {
      console.log(`URL TO FETCH:${URL_SEARCH_BY_NATIONALITY}${selectedName}`);
      fetch(`${URL_SEARCH_BY_NATIONALITY}${selectedNationality}`)
        .then((response) => response.json())
        .then((data) => setDriverStats(data))
        .catch((error) => console.error("Error fetching driver stats:", error));
    }
  }, [selectedNationality]);

  useEffect(() => {
    if (selectedName.length > 0) {
      console.log(`URL TO FETCH:${URL_SEARCH_BY_NAME}${selectedName}`);
      fetch(`${URL_SEARCH_BY_NAME}${selectedName}`)
        .then((response) => response.json())
        .then((data) => setDriverStats(data))
        .catch((error) => console.error("Error fetching driver stats:", error));
    }
  }, [selectedName]);

  // Function to format stat value
  const formatStatValue = (stat, value, total_race_entries) => {
    if (stat === "date_of_birth") {
      return new Date(value).toLocaleDateString().replace(/\//g, " / ");
    } else if (SPECIAL_STATS_TO_FILTER.includes(stat)) {
      return `${value} / ${total_race_entries}`;
    } else {
      return value.toString().replace(/-/g, " ");
    }
  };

  // Mapping stats labels outside of return
  const statsLabels = STATS_TO_FILTER.map((stat) => (
    <div key={stat} className="flex-1 text-center text-2xl font-bold p-1.5">
      {STATS_LABELS[stat]}
    </div>
  ));

  const allDrivers = driverStats.map((driver, index) => (
    <div
      key={`${driver.id}-${index}`}
      className="flex justify-center w-full mb-1.5"
    >
      {STATS_TO_FILTER.map((stat) => (
        <div
          key={`${driver.id}-${stat}`}
          className="flex-1 text-lg text-center p-1.5"
        >
          {stat === "name" ? (
            <a
              href={`${GO_TO_INDIVIDUAL_DRIVER}${driver.id}`}
              className="text-black no-underline hover:scale-110 transition-transform"
            >
              {driver[stat]}
            </a>
          ) : (
            formatStatValue(stat, driver[stat], driver["total_race_entries"])
          )}
        </div>
      ))}
    </div>
  ));

  return (
    <main className="flex flex-col items-center justify-center w-4/5 mx-auto flex-wrap">
      <header className="flex justify-center w-full mt-5 h-12">
        {statsLabels}
      </header>
      <section className="flex flex-col items-center w-full">
        {allDrivers}
      </section>
    </main>
  );
}
