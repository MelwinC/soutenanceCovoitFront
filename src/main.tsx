import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import InscriptionPage from "./pages/InscriptionPage.tsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/inscription",
    element: <InscriptionPage />,
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
