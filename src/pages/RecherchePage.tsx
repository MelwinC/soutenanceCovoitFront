import { ArrowRight, Car, Clock, Mail, Phone, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DatePicker from "@/components/DatePicker";
import { InputTime } from "@/components/InputTime";
import SelectVille from "@/components/SelectVille";
import Toast from "@/components/Toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { capitalize } from "@/lib/utils";
import { sendEmail } from "@/services/apiBrevo";
import { insertInscription } from "@/services/apiInscription";
import { getPersonne } from "@/services/apiPersonne";
import { getTrajet, listeTrajet } from "@/services/apiTrajet";
import { listeVille } from "@/services/apiVille";
import { getToken, removeCookies } from "@/services/authService";
import { Personne } from "@/types/personne";
import { DetailTrajet, Trajet } from "@/types/trajet";
import { Ville } from "@/types/ville";

const RecherchePage = () => {
  const [trajets, setTrajets] = useState<Trajet[]>([]);
  const [allTrajets, setAllTrajets] = useState<Trajet[]>([]);
  const [currentTrajet, setCurrentTrajet] = useState<DetailTrajet | undefined>(
    undefined
  );
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [villes, setVilles] = useState<Ville[]>([]);
  const [idVilleDep, setIdVilleDep] = useState(0);
  const [idVilleArr, setIdVilleArr] = useState(0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  const token = getToken()!;

  const currentPersonne = getPersonne().then((response) => {
    if ("personne" in response) {
      return response.personne;
    } else {
      throw new Error("Personne property does not exist on response object");
    }
  });

  const fetchTrajet = async (id: number, token: string) => {
    const response = await getTrajet({ id, token });
    if ("trajet" in response) {
      setCurrentTrajet(response.trajet);
    }
  };

  const contacterConducteur = (sender: Personne) => {
    sendEmail(
      `Trajet ${currentTrajet?.id} - ${subject}`,
      sender,
      currentTrajet!.personne,
      message
    );
    setMessage("");
    setSubject("");
    setIsSheetOpen(false);
    Toast(true, "Votre message a bien été envoyé !");
  };

  const reserverPlace = async (trajetId: number) => {
    const response = await insertInscription({ id_trajet: trajetId });
    if (response.message != "OK") {
      Toast(false, response.message);
    } else {
      Toast(true, "Votre réservation a bien été enregistrée !");
      setIsSheetOpen(false);
    }
  };

  const rechercher = () => {
    console.log(allTrajets);
    console.log(idVilleDep, idVilleArr, date, time);
    setTrajets(
      allTrajets.filter(
        (trajet) =>
          (idVilleDep === 0 || trajet.villeDep.id === idVilleDep) &&
          (idVilleArr === 0 || trajet.villeArr.id === idVilleArr) &&
          (!date ||
            new Date(trajet.dateT).toLocaleDateString("fr-FR") ===
              date?.toLocaleDateString("fr-FR")) &&
          (!time || new Date(trajet.dateT).toLocaleTimeString("fr-FR") >= time)
      )
    );
  };

  useEffect(() => {
    const fetchVilles = async () => {
      const response = await listeVille();
      if ("villes" in response) {
        const data = await listeVille();
        data.villes.sort((a: Ville, b: Ville) =>
          a.ville.localeCompare(b.ville)
        );
        setVilles(data.villes);
      }
    };
    const fetchTrajets = async () => {
      const token = getToken()!;
      const response = await listeTrajet(token);
      if ("trajets" in response) {
        setTrajets(response.trajets);
        setAllTrajets(response.trajets);
      } else {
        if (response.message === "Accès non autorisé / Token expiré !") {
          Toast(false, "Session expirée, veuillez vous reconnecter !");
          removeCookies();
          navigate("/auth");
        }
      }
    };

    fetchVilles();
    fetchTrajets();
  }, [navigate, isSheetOpen]);

  return (
    <div className="flex flex-col items-center pb-16 md:pb-0 md:pt-16">
      <div className="bg-primary-dark rounded-md flex flex-col w-5/6 max-w-3xl mt-8 mb-8 p-6">
        <div className="flex mb-4 flex-col md:flex-row items-center">
          <SelectVille
            villes={villes}
            placeholder="Ville de départ"
            onValueChange={(value: string) => setIdVilleDep(parseInt(value))}
          />
          <SelectVille
            villes={villes}
            placeholder="Ville d'arrivée"
            onValueChange={(value: string) => setIdVilleArr(parseInt(value))}
            className="text-md text-neutral-600 p-6 px-4 md:ml-8 w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <DatePicker date={date} setDate={setDate} />
          <InputTime
            label="Heure de départ"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTime(e.target.value)
            }
            id="time"
            value={time}
            classname="relative w-full block rounded-md px-6 pt-5 pb-1 text-md text-neutral-900 bg-primary-light appearance-none focus:outline-none focus:ring-0 peer md:ml-8 mt-4 md:mt-0"
          />
        </div>
        <div className="flex justify-center">
          <Button
            variant={"dark"}
            onClick={() => {
              rechercher();
            }}
            className="mt-4 w-full md:w-3/5"
          >
            Rechercher
          </Button>
        </div>
      </div>
      {trajets.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg font-semibold">Aucun trajet n'a été trouvé.</p>
        </div>
      )}
      {trajets.map((trajet) => (
        <Sheet
          key={trajet.id}
          open={isSheetOpen}
          onOpenChange={() => setIsSheetOpen(!isSheetOpen)}
        >
          <SheetTrigger
            className="relative bg-primary-dark flex flex-col w-5/6 mb-6 h-auto pt-3 rounded-xl md:hover:bg-primary-dark/60 md:hover:cursor-pointer"
            onClick={() => fetchTrajet(trajet.id, token)}
          >
            <div className="absolute -top-3 right-3 bg-indigo-500 rounded-lg">
              <p className="px-2 py-1 text-[0.78rem]">
                {trajet.place_dispo === 0
                  ? "complet"
                  : trajet.place_dispo === 1
                  ? " 1 place restante"
                  : trajet.place_dispo + " places restantes"}
              </p>
            </div>
            <div className="px-4 pt-2 pb-3 flex items-center justify-between font-semibold w-full">
              <div className="flex items-center text-[1.1rem]">
                <p>{trajet.villeDep.ville}</p>
                <ArrowRight className="h-4 w-4 mx-2" />
                <p>{trajet.villeArr.ville}</p>
              </div>
              <p className="font-semibold">{trajet.kms} kms</p>
            </div>
            <div className="px-4 pb-3 flex items-center">
              <User2 className="text-indigo-400" />
              <p className="ml-2">{trajet.personne.prenom}</p>
            </div>
            <hr className="border-slate-600 w-full" />
            <p className="text-sm px-4 py-2.5 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {`${new Date(trajet.dateT)
                .toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                .split(" ")
                .map(capitalize)
                .join(" ")}, ${new Date(trajet.dateT).toLocaleTimeString(
                "fr-FR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}`}
            </p>
          </SheetTrigger>
          <SheetContent
            side={"right"}
            className="bg-ternary-dark text-primary-light border-none p-0"
          >
            <div className="py-5 pl-4 text-lg font-semibold">
              Détail du trajet
            </div>
            <div className="bg-primary-dark/60 h-full p-8">
              <div className="flex justify-between">
                <div className="flex items-center text-lg font-semibold">
                  <p>{currentTrajet?.villeDep.ville}</p>
                  <ArrowRight className="h-4 w-4 mx-2" />
                  <p>{currentTrajet?.villeArr.ville}</p>
                </div>
                <p className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {`${new Date(currentTrajet?.dateT || Date.now())
                    .toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .split(" ")
                    .map(capitalize)
                    .join(" ")}, ${new Date(
                    currentTrajet?.dateT || Date.now()
                  ).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
                </p>
              </div>
              <div className="flex justify-between pt-4">
                <div className="flex">
                  <Car />
                  <p className="px-2">{currentTrajet?.marque.nom}</p>
                  <p>{currentTrajet?.voiture[0].modele}</p>
                </div>
                <p>{currentTrajet?.place_dispo} places restantes</p>
              </div>
              <div className="flex justify-center items-center pt-6">
                <Button
                  variant={"dark"}
                  className="w-1/2 py-6 text-[0.95rem] mt-2"
                  onClick={() => reserverPlace(currentTrajet!.id)}
                >
                  Réserver une place
                </Button>
              </div>
              <hr className="border-slate-600 w-full my-8" />
              <div className="flex flex-col justify-center items-center">
                <div className="flex items-center justify-center text-lg pb-4">
                  <User2 className="text-indigo-400 h-8 w-8 mr-2" />
                  <p>
                    {currentTrajet?.personne.prenom}{" "}
                    {currentTrajet?.personne.nom}
                  </p>
                </div>
                <div className="flex items-center justify-center text-md pb-4">
                  <Phone className="text-indigo-400 h-7 w-7 mr-2" />
                  <p>{currentTrajet?.personne.tel}</p>
                </div>
                <div className="flex items-center justify-center text-md pb-4">
                  <Mail className="text-indigo-400 h-7 w-7 mr-2" />
                  <p>{currentTrajet?.personne.email}</p>
                </div>
                <Input
                  className="w-10/12 bg-primary-dark border-primary-light/50 focus:border-primary-dark"
                  placeholder="Sujet"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Textarea
                  className="w-10/12 my-4 h-40 bg-primary-dark border-primary-light/50 focus:border-primary-dark"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                  variant={"dark"}
                  className="w-1/2 py-6 px-32 text-[0.95rem] mt-2"
                  onClick={async () => {
                    const currentPerson = await currentPersonne;
                    contacterConducteur(currentPerson);
                  }}
                >
                  Contacter le conducteur
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
};

export default RecherchePage;
