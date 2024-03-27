import { useEffect, useState } from "react";

import DatePicker from "@/components/DatePicker";
import { InputTime } from "@/components/InputTime";
import Toast from "@/components/Toast";
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
import { getProfile } from "@/services/apiPersonne";
import { insertTrajet } from "@/services/apiTrajet";
import { listeVille } from "@/services/apiVille";
import { Marque } from "@/types/marque";
import { Personne } from "@/types/personne";
import { Ville } from "@/types/ville";
import { Voiture } from "@/types/voiture";

type Profil = {
  personne: Personne;
  voiture: Voiture;
  marque: Marque;
  message: string;
};

const PublierPage = () => {
  const [variant, setVariant] = useState("passager");
  const [profil, setProfil] = useState<Profil>();
  const [villes, setVilles] = useState<Ville[]>();
  const [error, setError] = useState<string | null>(null);
  const [idVilleDep, setIdVilleDep] = useState(0);
  const [idVilleArr, setIdVilleArr] = useState(0);
  const [kms, setKms] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [places, setPlaces] = useState(0);

  const handleSubmit = async () => {
    if (
      idVilleDep === 0 ||
      idVilleArr === 0 ||
      kms === "" ||
      date === undefined ||
      time === ""
    ) {
      setError("Veuillez remplir tous les champs !");
      return;
    }

    if (idVilleDep === idVilleArr) {
      setError(
        "La ville de départ et la ville d'arrivée ne peuvent pas être identiques !"
      );
      return;
    }
    const dateT = buildDateTime();
    if (dateT < new Date()) {
      setError(
        "La date et l'heure de départ ne peuvent pas être antérieures à la date et l'heure actuelles !"
      );
      return;
    }
    if (profil && profil.voiture) {
      if (places + 1 > profil.voiture.place) {
        setError("Votre voiture ne possède pas assez de places !");
        return;
      }
    }
    const response = await insertTrajet({
      id_personne: profil!.personne.id,
      kms: kms,
      dateT: dateT.toISOString(),
      place_proposees: places,
      id_ville_dep: idVilleDep,
      id_ville_arr: idVilleArr,
    });
    if (response.message === "OK") {
      Toast(true, "Votre trajet a bien été publié !");
    } else {
      setError("Une erreur est survenue, veuillez réessayer !");
    }
  };

  const buildDateTime = () => {
    const [hours, minutes] = time.split(":").map(Number);
    const datetime = new Date(date!);
    datetime.setHours(hours + 1);
    datetime.setMinutes(minutes);
    return datetime;
  };

  useEffect(() => {
    const fetchProfil = async () => {
      const response = await getProfile();
      if ("voiture" in response) {
        setVariant("conducteur");
        if (response.voiture) {
          setProfil(response);
        }
      }
    };

    const fetchVilles = async () => {
      const data = await listeVille();
      data.villes.sort((a: Ville, b: Ville) => a.ville.localeCompare(b.ville));
      setVilles(data.villes);
    };

    fetchVilles();
    fetchProfil();
  }, []);

  useEffect(() => {
    setError(null);
  }, [idVilleDep, idVilleArr, kms, date, time, places]);

  return (
    <div className="pb-16 md:pb-0 md:pt-16 h-full flex items-center justify-center">
      {variant === "passager" ? (
        <div className="text-lg font-semibold">
          Vous ne pouvez pas publier de trajet sans voiture.
        </div>
      ) : (
        <div className="flex justify-center items-center bg-primary-dark w-full h-full">
          <div className="flex justify-center w-full h-full">
            <div className="bg-ternary-dark px-16 py-16 self-center mt-2 min-w-min max-w-2xl rounded-lg w-4/5">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                Publier un trajet
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <Select
                      onValueChange={(value: string) =>
                        setIdVilleDep(parseInt(value))
                      }
                    >
                      <SelectTrigger className="text-md text-neutral-600 py-6 px-6">
                        <SelectValue placeholder="Ville de départ" />
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
                  <div className="flex justify-center">
                    <Select
                      onValueChange={(value: string) =>
                        setIdVilleArr(parseInt(value))
                      }
                    >
                      <SelectTrigger className="text-md text-neutral-600 py-6 px-6">
                        <SelectValue placeholder="Ville d'arrivée" />
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
                  <Input
                    label="Kilomètres"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setKms(e.target.value)
                    }
                    id="kms"
                    type="number"
                    value={kms}
                  />
                  <Input
                    label="Places disponibles"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPlaces(parseInt(e.target.value))
                    }
                    id="places"
                    type="number"
                    min="1"
                    value={places.toString()}
                  />
                  <DatePicker date={date} setDate={setDate} />
                  <InputTime
                    label="Heure de départ"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTime(e.target.value)
                    }
                    id="time"
                    value={time}
                  />
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
      )}
    </div>
  );
};

export default PublierPage;
