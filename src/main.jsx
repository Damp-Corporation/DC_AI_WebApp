import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n.js";
import Home from './pages/Home.jsx';
import Layout from './components/Layout.jsx';
import ErrorPage from './pages/Error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: "/",
        element: <Home />
      },

    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
