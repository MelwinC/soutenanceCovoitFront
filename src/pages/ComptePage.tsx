import { useCallback, useEffect, useState } from "react";

import { Input } from "@/components/input";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/services/apiPersonne";
import { Link } from "react-router-dom";

const ComptePage = () => {
  const [prenom, setPrenom] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [modele, setModele] = useState<string>("");
  const [marque, setMarque] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [variant, setVariant] = useState("passager");

  const updateProfile = useCallback(async () => {
    if (variant === "conducteur") {
      if (!prenom || !nom || !tel || !email || !modele || !marque) {
        setError("Veuillez remplir tous les champs !");
      } else {
        // updateConducteur();
      }
    } else {
      if (!prenom || !nom || !tel || !email) {
        setError("Veuillez remplir tous les champs !");
      } else {
        // updatePassager();
      }
    }
  }, [prenom, nom, tel, email, modele, marque, variant]);

  useEffect(() => {
    setError(null);
  }, [prenom, nom, tel, email, modele, marque]);

  useEffect(() => {
    const fetchProfil = async () => {
      const response = await getProfile();
      console.log(response);
      if ("voiture" in response) {
        setVariant("conducteur");
        if (response.voiture) {
          setModele(response.voiture.modele ?? undefined);
          setMarque(response.marque.nom ?? undefined);
        }
      }
      setPrenom(response.personne.prenom ?? "");
      setNom(response.personne.nom ?? "");
      setTel(response.personne.tel ?? "");
      setEmail(response.personne.email ?? "");
    };
    fetchProfil();
  }, []);

  return (
    <div className="flex justify-center items-center bg-primary-dark w-full h-full">
      <div className="flex justify-center w-full h-full">
        <div className="bg-ternary-dark px-16 py-16 self-center mt-2 min-w-min max-w-2xl rounded-lg w-4/5">
          <h2 className="text-white text-4xl mb-8 font-semibold">Mon compte</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex flex-col gap-4">
            <Input
              label="Prenom"
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
              label="Téléphone"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTel(e.target.value)
              }
              id="tel"
              type="tel"
              value={tel}
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
            {variant === "conducteur" && (
              <>
                <Input
                  label="Modele"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setModele(e.target.value)
                  }
                  id="modele"
                  type="text"
                  value={modele}
                />
                <Input
                  label="Marque"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMarque(e.target.value)
                  }
                  id="marque"
                  type="text"
                  value={marque}
                />
              </>
            )}
          </div>
          <div className="flex justify-between items-end">
            <Button
              type="submit"
              variant="dark"
              className="text-lg w-full mt-10 active:bg-neutral-700 active:duration-300 py-6 mr-4"
              onClick={() => updateProfile()}
            >
              Modifier
            </Button>
            <Link to={"/"} className="w-full ml-4">
              <Button
                type="submit"
                variant="dark"
                className="text-lg w-full mt-4 active:bg-neutral-700 active:duration-300 py-6"
                onClick={() => updateProfile()}
              >
                Annuler
              </Button>
            </Link>
          </div>
          <Button
            variant={"dark"}
            className="bg-red-600 hover:bg-red-800 text-lg w-full mt-4 active:bg-neutral-700 active:duration-300 py-6 md:hidden flex"
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComptePage;
