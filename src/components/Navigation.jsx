import { Link } from "react-router-dom";
const Navigation = () => {
  const pages = ["Leads", "Leads By Status", "Agents", "Reports"];
  return (
    <>
      <div className="nav">
        <ul className="nav-items">
          {pages.map((page) => (
            <li key={page} className="list-item">
              <Link to={`/${page.toLowerCase()}`} className="nav-link">
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
