import React from "react";
import { NavLink } from "react-router-dom";
const Navigation = ({ menu, setMenu }) => {
  return (
    <div
      className="w-full h-[12vh] duration-300 flex p-3 fixed  "
     
    >
      <div className=" w-full flex items-center font-semibold  justify-center gap-16 text-white  ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-purple-500" : "")}
        >
          Dashbord
        </NavLink>
        <NavLink
          to={"/addNew"}
          className={({ isActive }) => (isActive ? "text-purple-500" : "")}
        >
          Create Agent
        </NavLink>
        <NavLink
          to={"/manage"}
          className={({ isActive }) => (isActive ? "text-purple-500" : "")}
        >
          Manage Agents
        </NavLink>
        <NavLink
          to={"/chat"}
          className={({ isActive }) => (isActive ? "text-purple-500" : "")}
        >
          Chat's
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
