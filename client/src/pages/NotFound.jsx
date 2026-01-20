/**
 * NotFound.jsx
 *
 * - Displays a 404 not found page
 * - Provides a button to return to the home page
 */

import { Link } from "react-router-dom";

/**
 * - NotFound()
 *
 * - Renders the not found (404) page
 */
const NotFound = () => {
  return (
    <>
      <h1>Not Found</h1>
      <Link to={"/"}>
        {/* Button to return to home page */}
        <button>Go Back</button>
      </Link>
    </>
  );
};

export default NotFound;
