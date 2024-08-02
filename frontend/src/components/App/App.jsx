import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "../Navbar/Navbar.jsx";
import { Drivers } from "../Drivers/Drivers.jsx";
import { DriverStanding } from "../DriverStanding/DriverStanding.jsx";
import { IndividualDriver } from "../IndividualDriver/IndividualDriver.jsx";

export function App() {
  //<img src="/public/1.webp" alt="F1" className="w-full h-full" />
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route
          path="/drivers"
          element={<main className="app--main--container">{<Drivers />}</main>}
        />
        <Route path="/drivers/:driverId" element={<IndividualDriver />} />
        <Route
          path="/seasons_drivers_standings"
          element={<h1>Seasons Drivers Standings</h1>}
        />
        <Route
          path="/seasons_drivers_standings/:year"
          element={<DriverStanding />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
