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
import { toast } from "@/components/ui/use-toast";
import { listeMarque } from "@/services/apiMarque";
import {
  deleteVoiture,
  getProfile,
  updatePersonne,
} from "@/services/apiPersonne";
import { Marque } from "@/types/marque";
import { CheckCircle } from "lucide-react";

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
  const [idVoiture, setIdVoiture] = useState<number | null>(null);

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
        const response = await updatePersonne({
          prenom,
          nom,
          tel,
          email,
          id_marque: idMarque,
          modele,
          place: nbPlaces,
        });
        if (response.message === "OK") {
          toast({
            description: (
              <span className="flex items-center">
                <CheckCircle style={{ color: "green" }} />
                <p className="pl-4 text-[1rem]">
                  Votre profil a bien été mis à jour !
                </p>
              </span>
            ),
            duration: 3000,
            variant: "success",
          });
          fetchProfil();
        } else {
          setError("Erreur lors de la mise à jour du profil");
        }
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

  const removeCar = async () => {
    setVariant("passager");
    if (!idVoiture) {
      setError("Vous n'avez pas encore enregistré de voiture !");
      return;
    }
    const response = await deleteVoiture(idVoiture);
    if (response.message === "OK") {
      toast({
        description: (
          <span className="flex items-center">
            <CheckCircle style={{ color: "green" }} />
            <p className="pl-4 text-[1rem]">
              Votre voiture et vos trajets (conducteur) ont bien été supprimés !
            </p>
          </span>
        ),
        duration: 3000,
        variant: "success",
      });
      setIdVoiture(null);
      setModele("");
      setIdMarque(null);
    } else {
      setError("Erreur lors de la suppression de la voiture");
    }
  };

  useEffect(() => {
    setError(null);
  }, [prenom, nom, tel, email, modele, idMarque, modele, nbPlaces]);

  const fetchProfil = async () => {
    const response = await getProfile();
    if ("voiture" in response) {
      setVariant("conducteur");
      if (response.voiture) {
        setModele(response.voiture.modele);
        setNbPlaces(response.voiture.place);
        setIdMarque(response.marque.id);
        setIdVoiture(response.voiture.id);
      }
    }
    setPrenom(response.personne.prenom);
    setNom(response.personne.nom);
    setTel(response.personne.tel);
    setEmail(response.personne.email);
  };

  useEffect(() => {
    const fetchMarques = async () => {
      const response = await listeMarque();
      setMarques(response.marques);
    };

    fetchProfil();
    fetchMarques();
  }, []);

  return (
    <div className="flex justify-center items-center bg-primary-dark w-full h-full pb-16 md:pb-0 md:pt-16">
      <div className="flex justify-center w-full">
        <div className="bg-ternary-dark px-8 md:px-12 py-8 self-center min-w-min max-w-2xl rounded-lg w-full md:w-4/5 ">
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
          <Button
            type="submit"
            variant="dark"
            className="text-md w-full mt-10 active:bg-neutral-700 active:duration-300 py-4"
            onClick={() => updateProfile()}
          >
            Modifier
          </Button>
          {variant === "conducteur" && (
            <Button
              type="submit"
              variant="delete"
              className="text-md w-full mt-4 active:bg-neutral-700 active:duration-300 py-4"
              onClick={() => removeCar()}
            >
              Supprimer ma voiture
            </Button>
          )}
          {variant === "passager" && (
            <Button
              type="submit"
              variant="dark"
              className="text-md w-full mt-4 active:bg-neutral-700 active:duration-300 py-4"
              onClick={() => setVariant("conducteur")}
            >
              Ajouter une voiture
            </Button>
          )}
          <Button
            variant={"dark"}
            className="bg-red-600 hover:bg-red-800 text-md w-full mt-4 active:bg-neutral-700 active:duration-300 py-4 md:hidden flex"
          >
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComptePage;
