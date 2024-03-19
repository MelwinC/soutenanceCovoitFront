import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { removeToken } from "@/services/authService";

const HomePage = () => {
  return (
    <>
      <Button variant={"light"}>
        <Link to="/auth">Auth page</Link>
      </Button>

      <Button variant={"light"} onClick={removeToken}>
        Logout
      </Button>
    </>
  );
};

export default HomePage;
