/**
 * Privacy.jsx
 *
 * - Displays the privacy policy for Chatter
 * - Outlines data collection, usage, rights, and contact info
 */

import Navbar from "../components/NavBar.jsx";

/**
 * - Privacy()
 *
 * - Renders the privacy policy content
 */
const Privacy = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="basic-page">
        <h1>Privacy Policy</h1>
        <div className="basic-page-container">
          <div className="basic-page-container-content">
            <section>
              <h2>Introduction</h2>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and
                protect your personal information when you use Chatter.
              </p>
            </section>

            <section>
              <h2>Information We Collect</h2>
              <p>We may collect:</p>
              <ul>
                {/* List of collected data types */}
                <li>Account details (name)</li>
                <li>Profile information and preferences</li>
                <li>Messages and content you provide</li>
                <li>Usage and device information, cookies</li>
              </ul>
            </section>

            <section>
              <h2>How We Use Your Information</h2>
              <p>
                We use data to provide and improve services, authenticate users,
                send notifications, and for safety and moderation purposes.
              </p>
            </section>

            <section>
              <h2>Sharing and Third Parties</h2>
              <p>
                We may share information with service providers, analytics
                partners, and when required by law. We do not sell personal
                data.
              </p>
            </section>

            <section>
              <h2>Cookies & Tracking</h2>
              <p>
                We use cookies and similar technologies for session management,
                preferences, and analytics. You can control cookies via your
                browser settings.
              </p>
            </section>

            <section>
              <h2>Security</h2>
              <p>
                We implement reasonable measures to protect data, but no method
                is 100% secure. Please keep your account credentials safe.
              </p>
            </section>

            <section>
              <h2>Your Rights</h2>
              <p>
                Depending on your location, you may have rights to access,
                correct, or delete your personal information. Contact us for
                requests.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                For privacy questions or requests, please contact us through the
                Contact page.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
