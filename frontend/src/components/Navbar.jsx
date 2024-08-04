import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-red-600 text-white flex max-w-full h-24 justify-between items-center gap-12 px-[15%]">
      <h1>F1 Stats</h1>
      <div className="flex gap-12">
        <Link
          to="/"
          className="text-white text-base no-underline hover:scale-110 transition-transform"
        >
          Home
        </Link>
        <Link
          to="/drivers"
          className="text-white text-base no-underline hover:scale-110 transition-transform"
        >
          Drivers
        </Link>
        <Link
          to="/seasons_drivers_standings"
          className="text-white text-base no-underline hover:scale-110 transition-transform"
        >
          Drivers Standings
        </Link>
      </div>
    </nav>
  );
}
