import { capitalize } from "@/lib/utils";
import { getTrajet } from "@/services/apiTrajet";
import { getToken } from "@/services/authService";
import { InscriptionConducteur } from "@/types/inscription";
import { DetailTrajet } from "@/types/trajet";
import { ArrowRight, ChevronDown, Clock } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const TrajetConducteur = ({
  inscriptions,
}: {
  inscriptions: InscriptionConducteur[];
}) => {
  const [currentTrajet, setCurrentTrajet] = useState<DetailTrajet | undefined>(
    undefined
  );
  const token = getToken()!;

  const fetchTrajet = async (id: number, token: string) => {
    const response = await getTrajet({ id, token });
    console.log(response);
    if ("trajet" in response) {
      setCurrentTrajet(response.trajet);
    } else {
      console.error(response.message);
    }
  };
  return (
    <>
      {inscriptions.map((inscription) => (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          key={inscription.trajet.id}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger
              className="relative bg-primary-dark flex flex-col w-full mb-6 h-auto pt-3 rounded-xl md:hover:bg-primary-dark/60 md:hover:cursor-pointer"
              onClick={() => fetchTrajet(inscription.trajet.id, token)}
            >
              <div className="absolute -top-3 right-3 bg-indigo-500 rounded-lg">
                <p className="px-2 py-1 text-[0.78rem]">
                  {inscription.trajet.place_dispo} places restantes
                </p>
              </div>
              <div className="flex justify-between w-full px-4 items-center">
                <div className="flex flex-col w-full">
                  <div className="px-4 pt-2 pb-3 flex items-center justify-between font-semibold w-full">
                    <div className="flex items-center text-[1.1rem]">
                      <p>{inscription.trajet.villeDep.ville}</p>
                      <ArrowRight className="h-4 w-4 mx-2" />
                      <p>{inscription.trajet.villeArr.ville}</p>
                    </div>
                    <p className="font-semibold">
                      {inscription.trajet.kms} kms
                    </p>
                  </div>
                  <p className="text-sm px-4 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {`${new Date(inscription.trajet.dateT)
                      .toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      .split(" ")
                      .map(capitalize)
                      .join(" ")}, ${new Date(
                      inscription.trajet.dateT
                    ).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
                  </p>
                </div>
                <ChevronDown className="h-6 w-6 ml-4 shrink-0 transition-transform duration-200" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default TrajetConducteur;
