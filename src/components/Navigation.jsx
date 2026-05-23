import { NavLink } from "react-router-dom";
import { FaAddressBook, FaUserTie, FaChartPie, FaCog } from "react-icons/fa";

const Navigation = () => {
  const navItems = [
    { name: "Leads", path: "/leads", icon: <FaAddressBook /> },
    { name: "Agents", path: "/agents", icon: <FaUserTie /> },
    { name: "Reports", path: "/reports", icon: <FaChartPie /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <nav className="nav">
      <ul className="nav-items">
        {navItems.map((item) => (
          <li key={item.name} className="list-item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
