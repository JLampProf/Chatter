import Navbar from "../components/NavBar.jsx";
import Banner from "../components/Banner.jsx";
import List from "../components/List.jsx";
import { features } from "../data/features.js";
import { useGlobalAuth } from "../context/AuthContext.jsx";
import Home from "./Home.jsx";
import SessionRestoreIndicator from "../components/SessionRestoreIndicator.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StateContext from "../context/StateContext.jsx";

const App = () => {
  const { isLoggedIn } = useGlobalAuth();

  return (
    <>
      <ToastContainer className="toaster" autoClose={2000} />
      <SessionRestoreIndicator />
      {isLoggedIn ? (
        <StateContext>
          <Home />
        </StateContext>
      ) : (
        <div className="app-layout">
          <Navbar />
          <Banner />
          <section className="main-page">
            <article className="main-page-left">
              <h1>Features:</h1>
              <List array={features} />
            </article>
          </section>
        </div>
      )}
    </>
  );
};

export default App;
