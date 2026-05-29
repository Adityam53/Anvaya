import { Link } from "react-router-dom";
const Button = ({
  label,
  to,
  icon,
  variant = "primary",
  fullWidth = false,
}) => {
  return (
    <Link
      className={`
        btn
        btn-${variant}
        ${fullWidth ? "btn-full" : ""}
      `}
      to={to}
    >
      {icon && <span className="btn-icon">{icon}</span>}

      <span>{label}</span>
    </Link>
  );
};

export default Button;
