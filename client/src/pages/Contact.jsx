/**
 * Contact.jsx
 *
 * - Displays contact information for the creator
 */

import Navbar from "../components/NavBar.jsx";

/**
 * - Contact()
 *
 * - Renders the contact information page
 */
const Contact = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="basic-page">
        <h1>Contact</h1>
        <div className="basic-page-container">
          <div className="basic-page-container-content">
            {/* Creator and contact details */}
            <h2>Creator: Johann Lamprecht</h2>
            <h2>email: j.lamprechri@gmail.com</h2>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
