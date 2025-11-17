import { Link } from "react-router-dom";

const Button = ({ label, to }) => {
  return (
    <>
      <Link className="add-btn" to={to}>
        {label}
      </Link>
    </>
  );
};

export default Button;
