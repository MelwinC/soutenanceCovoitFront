import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/navbar.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ComptePage from "./pages/ComptePage.tsx";
import InsertPersonnePage from "./pages/InsertPersonnePage.tsx";
import PublierPage from "./pages/PublierPage.tsx";
import RecherchePage from "./pages/RecherchePage.tsx";
import TrajetsPage from "./pages/TrajetsPage.tsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <Navbar />
        <RecherchePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/inscription",
    element: <InsertPersonnePage />,
  },
  {
    path: "/trajets",
    element: (
      <ProtectedRoute>
        <Navbar />
        <TrajetsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/publier",
    element: (
      <ProtectedRoute>
        <Navbar />
        <PublierPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/compte",
    element: (
      <ProtectedRoute>
        <Navbar />
        <ComptePage />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="d-flex h-full w-full bg-ternary-dark text-primary-light">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  </React.StrictMode>
);
