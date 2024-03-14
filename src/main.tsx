import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import "./main.css";
import HomePage from "./pages/HomePage.tsx";
import AuthTest from "./tests/AuthTest.tsx";
import RoleTest from "./tests/RolesTest.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/test/auth",
    element: <AuthTest />,
  },
  {
    path: "/test/roles",
    element: <RoleTest />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
