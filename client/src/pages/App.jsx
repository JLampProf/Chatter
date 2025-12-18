import Navbar from "../components/NavBar.jsx";
import Banner from "../components/Banner.jsx";
import List from "../components/List.jsx";
import { features } from "../../public/data/features.js";
import { useGlobalAuth } from "../context/AuthContext.jsx";
import Home from "./Home.jsx";
import { useEffect } from "react";
import { socket } from "../scripts/socket.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isLoggedIn } = useGlobalAuth();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <>
      <ToastContainer className="toaster" autoClose={2000} />
      {isLoggedIn ? (
        <Home />
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
