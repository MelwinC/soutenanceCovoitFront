import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isLoggedIn, isPersonne } from "@/services/authService";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/auth");
    if (isLoggedIn() && !isPersonne()) navigate("/inscription");
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
