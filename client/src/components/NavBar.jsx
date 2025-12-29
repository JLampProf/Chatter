import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  //TODO: Privacy Policy flashes at startup
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setSelected(1);
    else if (path === "/about") setSelected(2);
    else if (path === "/contact") setSelected(3);
    else if (path === "/privacy") setSelected(4);
    else setSelected(0);
  }, [location.pathname]);

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li
          onClick={() => {
            setSelected(1);
            navigate("/");
          }}
          className={`nav-list-item ${selected === 1 ? "nav-selected" : ""}`}
        >
          Welcome
        </li>
        <li
          onClick={() => {
            setSelected(2);
            navigate("/about");
          }}
          className={`nav-list-item ${selected === 2 ? "nav-selected" : ""}`}
        >
          About
        </li>
        <li
          onClick={() => {
            setSelected(3);
            navigate("/contact");
          }}
          className={`nav-list-item ${selected === 3 ? "nav-selected" : ""}`}
        >
          Contact
        </li>
        <li
          onClick={() => {
            setSelected(4);
            navigate("/privacy");
          }}
          className={`nav-list-item ${selected === 4 ? "nav-selected" : ""}`}
        >
          Privacy
        </li>
      </ul>
      <div className="nav-interaction">
        <section className="nav-auth-buttons">
          <button onClick={() => navigate("/register")} className="nav-button">
            Register
          </button>
          <button onClick={() => navigate("/login")} className="nav-button">
            Login
          </button>
        </section>
      </div>
    </nav>
  );
};
export default Navbar;
