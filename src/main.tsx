import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPage from "./pages/AuthPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import AuthTest from "./tests/AuthTest.tsx";
import RoleTest from "./tests/RolesTest.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/test/auth",
    element: <AuthTest />,
  },
  {
    path: "/test/roles",
    element: <RoleTest />,
  },
  {
    path: "*",
    element: <HomePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="d-flex h-full w-full bg-ternary-dark text-primary-light">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
