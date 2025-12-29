import Navbar from "../components/NavBar.jsx";

const About = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="basic-page">
        <h1>About</h1>
        <div className="basic-page-container">
          <div className="basic-page-container-content">
            <p className="basic-page-container-content-info">
              This site serves as a portfolio piece, this is the first fullstack
              application that I have developed. Please read the READ ME, for
              full details on the site.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
