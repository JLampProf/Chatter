import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  //TODO: Privacy Policy flashes at startup
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li
          onClick={() => setSelected(1)}
          className={`nav-list-item ${selected === 1 ? "nav-selected" : ""}`}
        >
          Welcome
        </li>
        <li
          onClick={() => setSelected(2)}
          className={`nav-list-item ${selected === 2 ? "nav-selected" : ""}`}
        >
          About
        </li>
        <li
          onClick={() => setSelected(3)}
          className={`nav-list-item ${selected === 3 ? "nav-selected" : ""}`}
        >
          Contact
        </li>
        <li
          onClick={() => setSelected(4)}
          className={`nav-list-item ${selected === 4 ? "nav-selected" : ""}`}
        >
          Privacy
        </li>
      </ul>
      <div className="nav-interaction">
        {/* <form className="nav-search" role="search">
          <input className="nav-search-bar" type="text" />
          <button className="nav-search-button" type="submit">
            Search
          </button>
        </form> */}
        <section className="nav-auth-buttons">
          <button className="nav-button">Register</button>
          <button onClick={() => navigate("/login")} className="nav-button">
            Login
          </button>
        </section>
      </div>
    </nav>
  );
};
export default Navbar;
