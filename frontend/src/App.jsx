import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Drivers } from "./sections/Drivers.jsx";
import { DriversChampionship } from "./sections/DriversChampionship.jsx";
import { IndividualDriversChampionship } from "./sections/IndividualDriversChampionship.jsx";
import { Home } from "./sections/Home.jsx";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route
          path="/seasons_drivers_standings"
          element={<DriversChampionship />}
        />
        <Route
          path="/seasons_drivers_standings/:year"
          element={<IndividualDriversChampionship />}
        />
        <Route path="*" element={<p>Error 404, not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}
