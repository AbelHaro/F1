import React from "react";
import { NavItem } from "./NavItem";

const links = [
  { link: "/", linkText: "Home" },
  { link: "/drivers", linkText: "Drivers" },
  { link: "/seasons_drivers_standings", linkText: "Drivers Standings" },
];

export function Navbar() {
  return (
    <nav className="bg-red-600 text-white flex max-w-full h-24 justify-between items-center px-20 text-lg uppercase font-bold">
      <h1 className="text-2xl">F1 Stats</h1>
      <div className="flex gap-12">
        {links.map((link) => (
          <NavItem key={link.link} link={link.link} linkText={link.linkText} />
        ))}
      </div>
      <a
        href="https://github.com/AbelHaro/F1"
        target="_blank"
        rel="noreferrer"
        className="hover:scale-110"
      >
        <img src="src/assets/github.svg" alt="GitHub Logo" className="size-8" />
      </a>
    </nav>
  );
}
