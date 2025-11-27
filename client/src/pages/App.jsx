import Navbar from "../components/NavBar.jsx";
import Banner from "../components/Banner.jsx";
import List from "../components/List.jsx";
import { features } from "../../public/data/features.js";
import { useGlobalAuth } from "../context/AuthContext.jsx";
import Home from "./Home.jsx";

const App = () => {
  const { isLoggedIn } = useGlobalAuth();
  return (
    <>
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
