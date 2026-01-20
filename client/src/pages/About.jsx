/**
 * About.jsx
 *
 * - Displays information about the Chatter project
 * - Portfolio and project details
 */

import Navbar from "../components/NavBar.jsx";

/**
 * - About()
 *
 * - Renders the about page content
 */
const About = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="basic-page">
        <h1>About</h1>
        <div className="basic-page-container">
          <div className="basic-page-container-content">
            <p className="basic-page-container-content-info">
              {/* Brief project description for visitors */}
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
