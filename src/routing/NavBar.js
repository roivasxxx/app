import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <div className="menu">
        <Link to="/">
          <h2>Home</h2>
        </Link>
        <Link to="/todo">
          <h2>To-do</h2>
        </Link>
        <Link to="/notes">
          <h2>Notes</h2>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
