/**
 * LoadingBar.jsx
 *
 * - Shows a loading bar while data is loading
 */

import { useGlobalState } from "../../context/StateContext.jsx";

/**
 * - LoadingBar()
 *
 * - Renders a loading bar and sets loaded state after delay
 */
const LoadingBar = () => {
  const { setIsLoaded } = useGlobalState();

  setTimeout(() => {
    setIsLoaded(true); // Simulate loading for 2 seconds
  }, 2000);

  return (
    <section className="loading-icon">
      <div className="loading-bar">
        <div className="loading-bar-inner"></div>
      </div>
    </section>
  );
};

export default LoadingBar;
