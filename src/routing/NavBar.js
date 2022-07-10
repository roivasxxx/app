import React from "react";
import { Link, Outlet } from "react-router-dom";

const textStyle = "text-purple-300 hover:text-purple-500";

export default function NavBar() {
  return (
    <>
      <div className="flex row justify-around items-center my-2 bg-gray-600">
        <Link to="/">
          <h2 className={textStyle}>Home</h2>
        </Link>
        <Link to="/todo">
          <h2 className={textStyle}>To-do</h2>
        </Link>
        <Link to="/notes">
          <h2 className={textStyle}>Notes</h2>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
