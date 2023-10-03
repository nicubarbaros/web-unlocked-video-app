import React from "react";
import { Button, Input, Navbar } from "react-daisyui";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar>
      <div className="flex-1">
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
      </div>
      <div className="flex-none gap-2">
        {/* <Form> */}
        <Input bordered type="text" placeholder="Search" className="w-24 md:w-auto" />
        {/* </Form> */}
        <Button tag="label" tabIndex={0} color="ghost" className="avatar" shape="circle">
          <div className="w-10 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </Button>
      </div>
    </Navbar>
  );
}
