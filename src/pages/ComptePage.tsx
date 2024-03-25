import { useCallback, useEffect, useState } from "react";

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
import { listeMarque } from "@/services/apiMarque";
import { getProfile, updatePersonne } from "@/services/apiPersonne";
import { Marque } from "@/types/marque";

const ComptePage = () => {
  const [prenom, setPrenom] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [modele, setModele] = useState<string>("");
  const [idMarque, setIdMarque] = useState<number | null>(null);
  const [nbPlaces, setNbPlaces] = useState(0);
  const [marques, setMarques] = useState<Marque[]>();
  const [error, setError] = useState<string | null>(null);
  const [variant, setVariant] = useState("passager");

  const marqueUser = marques?.find((marque) => marque.id === idMarque);

  const updateProfile = useCallback(async () => {
    if (variant === "conducteur") {
      if (
        !prenom ||
        !nom ||
        !tel ||
        !email ||
        !modele ||
        !idMarque ||
        !nbPlaces
      ) {
        setError("Veuillez remplir tous les champs !");
      } else {
        await updatePersonne({
          prenom,
          nom,
          tel,
          email,
          id_marque: idMarque,
          modele,
          place: nbPlaces,
        });
      }
    } else {
      if (!prenom || !nom || !tel || !email) {
        setError("Veuillez remplir tous les champs !");
      } else {
        updatePersonne({
          prenom,
          nom,
          tel,
          email,
        });
      }
    }
  }, [prenom, nom, tel, email, modele, idMarque, variant, nbPlaces]);

  useEffect(() => {
    setError(null);
  }, [prenom, nom, tel, email, modele, idMarque, modele, nbPlaces]);

  useEffect(() => {
    const fetchProfil = async () => {
      const response = await getProfile();
      if ("voiture" in response) {
        setVariant("conducteur");
        if (response.voiture) {
          setModele(response.voiture.modele);
          setNbPlaces(response.voiture.place);
          setIdMarque(response.marque.id);
        }
      }
      setPrenom(response.personne.prenom);
      setNom(response.personne.nom);
      setTel(response.personne.tel);
      setEmail(response.personne.email);
    };

    const fetchMarques = async () => {
      const response = await listeMarque();
      setMarques(response.marques);
    };

    fetchProfil();
    fetchMarques();
  }, []);

  return (
    <div className="flex justify-center items-center bg-primary-dark w-full h-full">
      <div className="flex justify-center w-full h-full">
        <div className="bg-ternary-dark px-12 py-8 self-center min-w-min max-w-2xl rounded-lg w-4/5 mb-16 md:mt-16 md:mb-0">
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
                  label="Nombre de places"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNbPlaces(parseInt(e.target.value))
                  }
                  id="nbPlaces"
                  type="number"
                  value={nbPlaces.toString()}
                />
                <Input
                  label="Modele"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setModele(e.target.value)
                  }
                  id="modele"
                  type="text"
                  value={modele}
                />
                <div className="relative">
                  <label className="absolute top-0.5 left-4 text-slate-600 text-md scale-75">
                    Marque
                  </label>
                  <Select
                    onValueChange={(value: string) =>
                      setIdMarque(parseInt(value))
                    }
                  >
                    <SelectTrigger className="text-md text-neutral-800 pt-9 pb-4 px-[22px]">
                      <SelectValue
                        placeholder={
                          marqueUser ? marqueUser.nom : "Choisir une marque"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup defaultValue={idMarque?.toString()}>
                        <SelectLabel>Marque</SelectLabel>
                        {marques?.map((marque: Marque) => (
                          <SelectItem
                            key={marque.id}
                            value={marque.id.toString()}
                            className="hover:cursor-pointer"
                            defaultValue={marque.nom}
                          >
                            {marque.nom}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          {variant === "passager" && (
            <Button
              type="submit"
              variant="dark"
              className="text-lg w-full mt-8 active:bg-neutral-700 active:duration-300 py-6"
              onClick={() => setVariant("conducteur")}
            >
              Ajouter une voiture
            </Button>
          )}
          <Button
            type="submit"
            variant="dark"
            className="text-lg w-full mt-4 active:bg-neutral-700 active:duration-300 py-6"
            onClick={() => updateProfile()}
          >
            Modifier
          </Button>
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
