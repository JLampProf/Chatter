import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.jsx";
import About from "./pages/About.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import StateContext from "./context/StateContext.jsx";
import Notifications from "./pages/Notifications.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/about", element: <About /> },
  // { path: "/home", element: <Home /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <StateContext>
        <RouterProvider router={router} />
      </StateContext>
    </AuthContext>
  </StrictMode>
);
