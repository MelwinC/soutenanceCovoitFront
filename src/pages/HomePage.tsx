import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Button>
        <Link to="/">Test</Link>
      </Button>
    </>
  );
};

export default HomePage;
