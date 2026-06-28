import { NavLink } from "react-router-dom";

function SidebarItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

export default SidebarItem;
