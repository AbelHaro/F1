import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Drivers } from "./sections/Drivers.jsx";
import { DriversChampionship } from "./sections/DriversChampionship.jsx";
import { Home } from "./sections/Home.jsx";

export function App() {
  //<img src="/public/1.webp" alt="F1" className="w-full h-full" />
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route
          path="/seasons_drivers_standings"
          element={<h1>Seasons Drivers Standings</h1>}
        />
        <Route
          path="/seasons_drivers_standings/:year"
          element={<DriversChampionship />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
