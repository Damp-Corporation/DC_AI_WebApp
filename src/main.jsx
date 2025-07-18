import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n.js";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // ✅ import it
import Layout from "./components/Layout.jsx";
import ErrorPage from "./pages/Error.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard", 
        element: <Dashboard />,
      },
      {
        path: "/login", 
        element: <Login />,
      },
      {
        path: "/register", 
        element: <Register />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
