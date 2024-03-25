import { ArrowRight, Car, Clock, Mail, Phone, User2 } from "lucide-react";
import { useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { capitalize } from "@/lib/utils";
import { getTrajet } from "@/services/apiTrajet";
import { getToken } from "@/services/authService";
import { DetailTrajet, Trajet } from "@/types/trajet";

const TrajetsConducteur = ({ inscriptions }: { inscriptions: Trajet[] }) => {
  const [currentTrajet, setCurrentTrajet] = useState<DetailTrajet | undefined>(
    undefined
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const token = getToken()!;

  const fetchTrajet = async (id: number, token: string) => {
    const response = await getTrajet({ id, token });
    if ("trajet" in response) {
      setCurrentTrajet(response.trajet);
    } else {
      console.error(response.message);
    }
  };

  return (
    <div>
      {inscriptions.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p className="text-lg font-semibold">Aucun trajet enregistré</p>
        </div>
      )}
      {inscriptions.map((trajet) => (
        <Sheet
          key={trajet.id}
          open={isSheetOpen}
          onOpenChange={() => setIsSheetOpen(!isSheetOpen)}
        >
          <SheetTrigger
            className="relative bg-primary-dark flex flex-col w-full mb-6 h-auto pt-3 rounded-xl md:hover:bg-primary-dark/60 md:hover:cursor-pointer"
            onClick={() => fetchTrajet(trajet.id, token)}
          >
            <div className="absolute -top-3 right-3 bg-indigo-500 rounded-lg">
              <p className="px-2 py-1 text-[0.78rem]">
                {trajet.place_dispo} places restantes
              </p>
            </div>
            <div className="px-4 pt-2 pb-3 flex items-center justify-between font-semibold w-full">
              <div className="flex items-center text-[1.1rem]">
                {/* <p>{trajet.villeDep.ville}</p> */}
                <ArrowRight className="h-4 w-4 mx-2" />
                {/* <p>{trajet.villeArr.ville}</p> */}
              </div>
              <p className="font-semibold">{trajet.kms} kms</p>
            </div>
            <div className="px-4 pb-3 flex items-center">
              <User2 className="text-indigo-400" />
              {/* <p className="ml-2">{trajet.personne.prenom}</p> */}
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
                  {`${new Date(currentTrajet?.dateT || new Date(Date.now()))
                    .toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    .split(" ")
                    .map(capitalize)
                    .join(" ")}, ${new Date(
                    currentTrajet?.dateT || new Date(Date.now())
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
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
};

export default TrajetsConducteur;
