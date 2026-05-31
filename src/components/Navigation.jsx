import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaAddressBook,
  FaUserTie,
  FaChartPie,
  FaCog,
  FaDashcube,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/", icon: <FaDashcube /> },
    { name: "Leads", path: "/leads", icon: <FaAddressBook /> },
    { name: "Agents", path: "/agents", icon: <FaUserTie /> },
    { name: "Reports", path: "/reports", icon: <FaChartPie /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <nav className="nav" onClick={() => setIsOpen(!isOpen)}>
      <div className="mobile-nav-header">
        <h2 className="nav-heading">Anvaya</h2>

        <button
          className="mobile-nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      <ul className={`nav-items ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <li key={item.name} className="list-item">
            <NavLink
              to={item.path}
              onClick={() => setIsOpen(!isOpen)}
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
