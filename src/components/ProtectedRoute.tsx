import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPersonne } from "@/services/apiPersonne";
import { isLoggedIn, isPersonne } from "@/services/authService";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/auth");
    if (isLoggedIn() && !isPersonne()) navigate("/inscription");
    const fetchPersonne = async () => {
      const personne = await getPersonne();
      if (personne.message === "Accès non autorisé / Token expiré !")
        navigate("/auth");
    };
    fetchPersonne();
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
