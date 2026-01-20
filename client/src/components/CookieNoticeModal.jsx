/**
 * CookieNoticeModal.jsx
 *
 * - Modal to inform users about cookie usage
 * - Explains authentication cookies and privacy
 */

const CookieModal = ({ onClose }) => {
  return (
    <div className="cookie-modal-overlay">
      <div className="cookie-modal">
        <h2>Cookie Notice</h2>
        <p>
          Welcome to Chatter! To provide you with a secure and seamless
          experience, our application uses essential cookies for authentication
          purposes.
        </p>
        <p>
          <strong>What are these cookies?</strong>
          <br />
          We use HTTP-only cookies to store your web tokens for authentication
          purposes. These cookies are automatically set when you log in and are
          necessary for maintaining your session and keeping you logged in
          securely.
        </p>
        <p>
          <strong>Why are they necessary?</strong>
          <br />
          Without these cookies, you would need to log in every time you refresh
          the page or navigate within the app. They help ensure your data
          remains protected and your experience uninterrupted.
        </p>
        <p>
          <strong>Your privacy:</strong>
          <br />
          These cookies cannot be accessed by JavaScript and are only used for
          server-side authentication. We do not use them for tracking or
          advertising purposes.
        </p>
        <button onClick={onClose} className="cookie-modal-button">
          I Understand
        </button>
      </div>
    </div>
  );
};

export default CookieModal;
