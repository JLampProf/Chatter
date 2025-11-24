const Navbar = () => {
  //TODO: Privacy Policy flashes at startup
  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li className="nav-list-item">Welcome</li>
        <li className="nav-list-item">About</li>
        <li className="nav-list-item">Contact</li>
        <li className="nav-list-item">Privacy</li>
      </ul>
      <div className="nav-interaction">
        <form className="nav-search" role="search">
          <input className="nav-search-bar" type="text" />
          <button className="nav-search-button" type="submit">
            Search
          </button>
        </form>
        <section className="nav-auth-buttons">
          <button className="nav-button">Register</button>
          <button className="nav-button">Login</button>
        </section>
      </div>
    </nav>
  );
};
export default Navbar;
