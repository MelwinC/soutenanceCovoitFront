import { removeCookies } from "@/services/authService";
import {
  CalendarDays,
  Car,
  LogOut,
  PlusCircle,
  Search,
  UserCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeCookies();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 w-full z-50 flex items-center bg-ternary-dark/80 h-16 border-b border-secondary-dark shadow-lg">
      <nav className="flex justify-between items-center h-full w-full px-12">
        <div>
          <Link to="/" className="text-white">
            <Button
              variant={"navbarLogo"}
              className="text-xl text-primary-light/90"
            >
              <Car />
              <p className="pl-2">Covoiturage</p>
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white">
            <Button variant={"navbarItem"}>
              <Search />
              <p className="pl-2">Rechercher un trajet</p>
            </Button>
          </Link>
          <Link to="/" className="text-white">
            <Button variant={"navbarItem"}>
              <CalendarDays />
              <p className="pl-2">Mes trajets</p>
            </Button>
          </Link>
          <Link to="/" className="text-white">
            <Button variant={"navbarItem"}>
              <PlusCircle />
              <p className="pl-2">Publier un trajet</p>
            </Button>
          </Link>
        </div>
        <div className="flex">
          <UserCircle2 className="text-primary-light/60 hover:text-primary-light/90 hover:cursor-pointer mr-4" />
          <LogOut
            className="text-primary-light/60 hover:text-primary-light/90 hover:cursor-pointer"
            onClick={logout}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
