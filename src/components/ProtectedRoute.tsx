import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isLoggedIn } from "@/services/authService";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/auth");
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
