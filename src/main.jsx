import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n.js";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx"; 
import Layout from "./components/Layout.jsx";
import ErrorPage from "./pages/Error.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgetPassword from "./pages/ForgetPasswword.jsx";

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
        path: "/forgot-password", 
        element: <ForgetPassword />,
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
