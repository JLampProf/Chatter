import { useGlobalState } from "../../context/StateContext.jsx";

const LoadingBar = () => {
  const { setIsLoaded } = useGlobalState();

  setTimeout(() => {
    setIsLoaded(true);
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
