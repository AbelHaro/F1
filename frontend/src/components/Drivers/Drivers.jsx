import React from "react";
import { useEffect, useState } from "react";
import { DriverStats } from "../DriverStats/DriverStats.jsx";
import DatalistInput from "react-datalist-input"; //https://github.com/andrelandgraf/react-datalist-input
import { URL } from "../../url.js";
import "react-datalist-input/dist/styles.css";
import "./Drivers.css";

const URL_ALL_DRIVERS = `${URL}/drivers/nationalities/all`;
const URL_NATIONALITIES = `${URL}/nationalities`;

export function Drivers() {
  const [nationalities, setNationalities] = useState([]);
  const [selectedNationality, setSelectedNationality] = useState("all");
  const [selectedName, setSelectedName] = useState("");
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch nationalities only if nationalities state is empty
    if (nationalities.length === 0) {
      fetch(URL_NATIONALITIES)
        .then((response) => response.json())
        .then((data) => {
          // Agregar un valor al inicio del array
          const modifiedNationalities = [...data]; // Clonar el array de data para no mutarlo directamente
          modifiedNationalities.unshift({
            id: "all",
            value: "All Nationalities",
            name: "All All Nationalities",
          }); // Agregar un valor al inicio
          setNationalities(modifiedNationalities); // Actualizar el estado
        })
        .catch((error) =>
          console.error("Error fetching nationalities:", error)
        );
    }
  });

  useEffect(() => {
    if (drivers.length === 0) {
      fetch(`${URL_ALL_DRIVERS}`)
        .then((response) => response.json())
        .then((drivers) => {
          const modifiedDrivers = drivers.map((driver) => ({
            id: driver.id,
            value: driver.name,
            name: driver.name,
          }));
          setDrivers(modifiedDrivers);
        })
        .catch((error) => console.error("Error fetching drivers:", error));
    }
  });

  function setSelectedNameDefault() {
    setSelectedName("");
  }

  function setSelectedNationalityDefault() {
    setSelectedNationality("all");
  }

  function handleChangeSelectedNationality(event) {
    setSelectedNameDefault();
    setSelectedNationality(event.target.value);
  }

  function handleChangeSelectedDriver(item) {
    setSelectedNationalityDefault();
    const selectedDriverIndex = drivers.findIndex(
      (driver) => driver.id === item.id
    );
    setSelectedName(drivers[selectedDriverIndex].id);
  }

  const nationalitiesOptions = nationalities.map((nationality) => (
    <option
      className="selector-label"
      key={nationality.id}
      value={nationality.id}
    >
      {nationality.id.replace(/-/g, " ").toUpperCase()}
    </option>
  ));

  return (
    <main className="flex flex-col align-middle w-full mt-10">
      <div className="flex gap-5 justify-center mb-5">
        <div>
          <DatalistInput
            placeholder="Driver name"
            label="Search driver"
            onSelect={handleChangeSelectedDriver}
            items={drivers}
            value={selectedName}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">Choose nationality</h3>
          <select
            className="h-[35px] border border-gray-500/30 rounded-md"
            onChange={handleChangeSelectedNationality}
            value={selectedNationality}
          >
            {nationalitiesOptions}
          </select>
        </div>
      </div>
      <DriverStats
        selectedNationality={selectedNationality}
        selectedName={selectedName}
      />
    </main>
  );
}
