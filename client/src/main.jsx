import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </StrictMode>
);
