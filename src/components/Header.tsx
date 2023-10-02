import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <ul className="flex gap-4 max-lg justify-center py-6">
      <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-500" : "white")}>
        Browse
      </NavLink>
      <NavLink to="/movies" className={({ isActive }) => (isActive ? "text-blue-500" : "white")}>
        Movies
      </NavLink>
      <NavLink to="/tv-shows" className={({ isActive }) => (isActive ? "text-blue-500" : "white")}>
        TV Shows
      </NavLink>
      <NavLink to="/games" className={({ isActive }) => (isActive ? "text-blue-500" : "white")}>
        Games
      </NavLink>
      <li>Search...</li>
    </ul>
  );
}
