import Cookies from "js-cookie";
import { Car, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SelectVille from "@/components/SelectVille";
import Toast from "@/components/Toast";
import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";
import { insertPersonne } from "@/services/apiPersonne";
import { listeVille } from "@/services/apiVille";
import {
  getIdCompte,
  isLoggedIn,
  isPersonne,
  removeCookies,
} from "@/services/authService";
import { Ville } from "@/types/ville";

const InsertPersonnePage = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [idVille, setIdVille] = useState<number | null>(null);
  const [villes, setVilles] = useState<Ville[]>([]);

  const token = Cookies.get("token")!;

  const navigate = useNavigate();

  const handleSubmit = () => {
    insertPersonne({
      prenom,
      nom,
      email,
      tel,
      id_compte: getIdCompte(),
      id_ville: idVille!,
      token,
    }).then((data) => {
      if (data.message === "OK") {
        const roles = Cookies.get("roles");
        const updatedRoles = roles
          ? roles + ",personne"
          : "utilisateur,personne";
        Cookies.set("roles", updatedRoles);
        Toast(true, `Inscription réussie, bienvenue ${capitalize(prenom)} !`);
        navigate("/");
      } else if (data.message === "L'email est déjà attribué !") {
        setError("L'email est déjà attribué !");
      } else {
        setError("Veuillez remplir tous les champs !");
      }
    });
  };

  const logout = () => {
    removeCookies();
    navigate("/auth");
  };

  useEffect(() => {
    if (!isLoggedIn()) navigate("/auth");
    if (isPersonne()) navigate("/");
    const getVilles = async () => {
      const data = await listeVille();
      data.villes.sort((a: Ville, b: Ville) => a.ville.localeCompare(b.ville));
      setVilles(data.villes);
    };
    getVilles();
  }, [navigate]);

  useEffect(() => {
    setError(null);
  }, [prenom, nom, email, tel, idVille]);

  return (
    <div className="flex justify-center items-center bg-primary-dark w-full h-full">
      <div className="flex justify-center w-full h-full">
        <div className="bg-ternary-dark px-16 py-16 self-center mt-2 min-w-min max-w-2xl rounded-lg w-4/5">
          <div className="flex justify-end">
            <LogOut
              className="text-primary-light/60 hover:text-primary-light/90 hover:cursor-pointer"
              onClick={logout}
            />
          </div>
          <div className="md:flex-1 text-center hidden md:block mb-8">
            <Button variant={"navbarLogo"} className="hover:cursor-default">
              <Car className="h-12 w-12" />
              <p className="pl-2 text-[2rem]">
                <span className="text-indigo-400">Covoit</span>urage
              </p>
            </Button>
          </div>
          <h2 className="text-white text-4xl mb-8 font-semibold">
            Inscription
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <div className="flex flex-col gap-4">
              <Input
                label="Prénom"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrenom(e.target.value)
                }
                id="prenom"
                type="text"
                value={prenom}
              />
              <Input
                label="Nom"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNom(e.target.value)
                }
                id="nom"
                type="text"
                value={nom}
              />
              <Input
                label="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Téléphone"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTel(e.target.value)
                }
                id="tel"
                type="tel"
                value={tel}
              />
              <div className="flex justify-center">
                <SelectVille
                  villes={villes}
                  placeholder="Choisir une ville"
                  onValueChange={(value: string) => setIdVille(parseInt(value))}
                  className="text-md text-neutral-600 p-6 px-4 md:ml-8 w-full"
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="dark"
              className="text-lg w-full mt-10 active:bg-neutral-700 active:duration-300 py-6"
            >
              S'inscrire
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsertPersonnePage;
