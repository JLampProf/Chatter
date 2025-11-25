import Navbar from "../components/NavBar.jsx";
import Banner from "../components/Banner.jsx";
import List from "../components/List.jsx";
import { features } from "../../public/data/features.js";

const App = () => {
  return (
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
  );
};

export default App;
