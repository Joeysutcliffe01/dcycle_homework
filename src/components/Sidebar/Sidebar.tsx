import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logos/dcycle_logo_croped.png";
import { FaViruses } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";

const Sidebar: React.FC = () => {
  return (
    <div className="w-40 bg-gray-100 flex flex-col items-center border-r-4 border-gray-300 ">
      {/* Logo Section */}
      <div className="my-6">
        <img src={Logo} alt="Dcycle Logo" className="h-25 w-22 p-4" />
      </div>

      {/* Navigation Links */}
      <ul className="w-full space-y-4 px-4">
        {/* COVID Data Icon */}
        <li className="flex flex-col items-center mt-8">
          <NavLink
            to="/covid-data"
            className={({ isActive }) =>
              `p-3 rounded-2xl transition duration-200 flex items-center justify-center ${
                isActive
                  ? "bg-gradient-to-r from-blue-700 to-cyan-500"
                  : "bg-blue-100 border border-gray-100 hover:bg-blue-200"
              }`
            }
          >
            <FaViruses size={43} className="text-white" />
          </NavLink>
          <span className="mt-1 text-blue-900 font-semibold">Covid Data</span>
        </li>

        {/* Name Info Icon with Gradient */}
        <li className="flex flex-col items-center mt-10">
          <NavLink
            to="/name-info"
            className={({ isActive }) =>
              `p-3 rounded-2xl transition duration-200 flex items-center justify-center ${
                isActive
                  ? "bg-gradient-to-r from-blue-700 to-cyan-500"
                  : "bg-blue-100 border border-gray-100 hover:bg-blue-200"
              }`
            }
          >
            <IoPersonOutline size={45} className="text-white" />
          </NavLink>
          <span className="mt-1 text-blue-900 font-semibold">Name Info</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
