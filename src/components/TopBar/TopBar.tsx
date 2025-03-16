import React from "react";
import { useLocation } from "react-router-dom";

const TopBar: React.FC = () => {
  const location = useLocation(); // Get the current route

  // Determine the title based on the route
  const pageTitle =
    location.pathname === "/covid-data"
      ? "Covid Data"
      : location.pathname === "/name-info"
      ? "Name Info"
      : "Dcycle Homework"; // Default title

  return (
    <header className="h-26 bg-gray-100 border-b-4 border-gray-300 flex items-center justify-between px-4 ml-9">
      <h1 className="text-xl font-bold text-gray-800 ">{pageTitle}</h1>
    </header>
  );
};

export default TopBar;
