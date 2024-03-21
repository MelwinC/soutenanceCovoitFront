import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { capitalize } from "@/lib/utils";
import { insertPersonne } from "@/services/apiPersonne";
import { listeVille } from "@/services/apiVille";
import { getIdCompte, isLoggedIn, isPersonne } from "@/services/authService";
import { Ville } from "@/types/ville";
import Cookies from "js-cookie";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InscriptionPage = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [idVille, setIdVille] = useState<number | null>(null);
  const [villes, setVilles] = useState<Ville[]>();

  const navigate = useNavigate();

  const handleSubmit = () => {
    insertPersonne({
      prenom,
      nom,
      email,
      tel,
      id_compte: getIdCompte(),
      id_ville: idVille!,
    }).then((data) => {
      if (data.message === "OK") {
        const roles = Cookies.get("roles");
        const updatedRoles = roles
          ? roles + ",personne"
          : "utilisateur,personne";
        Cookies.set("roles", updatedRoles);
        toast({
          description: (
            <span className="flex">
              <CheckCircle style={{ color: "green" }} />
              <p className="pl-4 text-[1rem]">
                Inscription réussie, bienvenue {capitalize(prenom)} !
              </p>
            </span>
          ),
          duration: 2000,
          variant: "success",
        });
        navigate("/");
      } else if (data.message === "L'email est déjà attribué !") {
        setError("L'email est déjà attribué !");
      } else {
        setError("Veuillez remplir tous les champs !");
      }
    });
  };

  useEffect(() => {
    if (!isLoggedIn()) navigate("/auth");
    if (isPersonne()) navigate("/");
    const getVilles = async () => {
      const data = await listeVille();
      setVilles(data.villes);
    };
    getVilles();
  }, [navigate]);

  useEffect(() => {
    setError(null);
  }, [prenom, nom, email, tel, idVille]);

  return (
    <div className="flex justify-center items-center bg-neutral-200 w-full h-full">
      <div className="flex justify-center w-full h-full">
        <div className="bg-ternary-dark px-16 py-16 self-center mt-2 min-w-min max-w-2xl rounded-lg w-4/5">
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
                <Select
                  onValueChange={(value: string) => setIdVille(parseInt(value))}
                >
                  <SelectTrigger className="text-md text-neutral-600 py-6 px-6">
                    <SelectValue placeholder="Choisir une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Villes</SelectLabel>
                      {villes?.map((ville: Ville) => (
                        <SelectItem
                          key={ville.id}
                          value={ville.id.toString()}
                          className="hover:cursor-pointer"
                        >
                          {ville.ville + " " + ville.cp}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              type="submit"
              variant="dark"
              className="w-full mt-10 active:bg-neutral-700 active:duration-300"
            >
              S'inscrire
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;
