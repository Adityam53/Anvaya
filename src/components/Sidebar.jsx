import Heading from "./Heading";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Heading tag="h2" name="Anvaya" />
        </Link>
        <Navigation />
      </div>
    </div>
  );
};

export default Sidebar;
