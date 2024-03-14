import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <>
      <Button>
        <Link to="/test">To TestPage</Link>
      </Button>
    </>
  );
};

export default HomePage;
