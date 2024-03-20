import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { removeCookies } from "@/services/authService";

const HomePage = () => {
  const navigate = useNavigate();
  const logout = () => {
    removeCookies();
    navigate("/auth");
  };
  return (
    <>
      <Button variant={"light"}>
        <Link to="/auth">Auth page</Link>
      </Button>

      <Button variant={"light"} onClick={logout}>
        Logout
      </Button>
    </>
  );
};

export default HomePage;
