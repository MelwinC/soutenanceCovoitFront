import {
  ArrowRight,
  ChevronDown,
  Clock,
  Phone,
  UserCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { capitalize } from "@/lib/utils";
import { sendEmail } from "@/services/apiBrevo";
import { deleteInscription } from "@/services/apiInscription";
import { deleteTrajet } from "@/services/apiTrajet";
import { InscriptionConducteur } from "@/types/inscription";
import { Personne } from "@/types/personne";
import { Trajet } from "@/types/trajet";
import Toast from "./Toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const TrajetConducteur = ({
  inscriptionsConducteur,
}: {
  inscriptionsConducteur: InscriptionConducteur[];
}) => {
  const [inscriptions, setInscriptions] = useState<InscriptionConducteur[]>(
    inscriptionsConducteur
  );
  const [currentTrajet, setCurrentTrajet] = useState<Trajet | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const conducteur = inscriptions[0]?.trajet.personne;

  const unsubscribe = async (inscrit: Personne) => {
    const response = await deleteInscription({
      id_personne: inscrit.id,
      id_trajet: currentTrajet!.id,
    });
    if (response.message === "OK") {
      Toast(true, `${inscrit.prenom} a bien été désinscrit!`);
      setInscriptions(
        inscriptions.map((inscription) => {
          return {
            ...inscription,
            inscrits: inscription.inscrits.filter((i) => i.id !== inscrit.id),
          };
        })
      );
    } else {
      Toast(false, "Erreur lors de la désinscription");
    }
  };

  const annulerTrajet = async (id_trajet: number) => {
    const response = await deleteTrajet(id_trajet);
    if (response.message === "OK") {
      Toast(true, "Trajet annulé avec succès !");
      setInscriptions(inscriptions.filter((i) => i.trajet.id !== id_trajet));
    } else {
      Toast(false, "Erreur lors de l'annulation du trajet");
    }
  };

  const contacter = (inscrits: Personne[]) => {
    if (subject === "" || message === "") {
      setError("Veuillez remplir tous les champs !");
      return;
    }
    const sender = conducteur!;
    inscrits.forEach((inscrit) => {
      sendEmail(
        `Trajet ${currentTrajet!.id} - ${subject}`,
        sender,
        inscrit,
        message
      );
    });
    Toast(true, "Email envoyé avec succès !");
  };

  useEffect(() => {
    setError(null);
  }, [subject, message]);

  return (
    <>
      {inscriptions.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg font-semibold">
            Vous n'avez enregistré aucun trajet.
          </p>
        </div>
      )}
      <Accordion type="single" collapsible className="w-full">
        {inscriptions.map((inscription) => (
          <AccordionItem
            className="mb-6"
            value={inscription.trajet.id.toString()}
            key={inscription.trajet.id}
          >
            <div className="relative bg-primary-dark flex flex-col w-full h-auto rounded-xl md:hover:bg-primary-dark/60 md:hover:cursor-pointer">
              <AccordionTrigger
                onClick={() => {
                  setCurrentTrajet(inscription.trajet);
                  setIsOpen(
                    inscription.trajet.id === currentTrajet?.id ? !isOpen : true
                  );
                }}
              >
                <div className="absolute -top-3 right-3 bg-indigo-500 rounded-lg">
                  <p className="px-2 py-1 text-[0.78rem]">
                    {inscription.trajet.place_dispo === 0
                      ? "complet"
                      : inscription.trajet.place_dispo === 1
                      ? " 1 place restante"
                      : inscription.trajet.place_dispo + " places restantes"}
                  </p>
                </div>
                <div className="flex justify-between w-full px-4 items-center">
                  <div className="flex flex-col w-full">
                    <div className="pt-2 pb-3 flex items-center justify-between font-semibold w-full">
                      <div className="flex items-center text-[1.1rem]">
                        <p>{inscription.trajet.villeDep.ville}</p>
                        <ArrowRight className="h-4 w-4 mx-2" />
                        <p>{inscription.trajet.villeArr.ville}</p>
                      </div>
                      <p className="font-semibold">
                        {inscription.trajet.kms} kms
                      </p>
                    </div>
                    <p className="text-sm flex items-center">
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
                  <ChevronDown
                    className={`h-6 w-6 ml-4 shrink-0 transition-transform duration-200 ${
                      isOpen && inscription.trajet.id === currentTrajet?.id
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <hr className="border-slate-600 w-full" />
                {inscription.inscrits.map((inscrit) => (
                  <div key={inscrit.id}>
                    <div className="flex items-center justify-between py-4 px-4">
                      <div className="flex items-center">
                        <UserCircle2 className="h-6 w-6 mr-3 text-indigo-400" />
                        <div className="flex items-center">
                          <p className="text-sm mr-1">{inscrit.prenom}</p>
                          <p className="font-semibold border-r mr-3 pr-3">
                            {inscrit.nom}
                          </p>
                          <div>
                            <Phone className="h-4 w-4 mr-2 text-indigo-400" />
                          </div>
                          <p>{inscrit.tel}</p>
                        </div>
                      </div>
                      <Button
                        variant={"delete"}
                        size={"sm"}
                        onClick={() => unsubscribe(inscrit)}
                      >
                        Désinscrire
                      </Button>
                    </div>
                    <hr className="border-slate-600 w-full" />
                  </div>
                ))}
                <>
                  <div className="flex flex-col md:flex-row items-center md:justify-center mt-4">
                    <Dialog>
                      <DialogTrigger>
                        <Button variant={"delete"}>Annuler le trajet</Button>
                      </DialogTrigger>
                      <DialogContent className="w-96 bg-ternary-dark text-primary-light border-none">
                        <DialogHeader>
                          <DialogTitle>Annulation du trajet</DialogTitle>
                          <DialogDescription className="py-4 text-primary-light/60">
                            Êtes-vous sûr de vouloir annuler ce trajet ?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end">
                          <Button className="mr-4" variant={"dark"}>
                            Annuler
                          </Button>
                          <Button
                            variant={"dark"}
                            onClick={() => annulerTrajet(inscription.trajet.id)}
                          >
                            Confirmer
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    {inscription.inscrits.length != 0 && (
                      <>
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              variant={"dark"}
                              className="md:ml-8 mt-4 md:mt-0"
                            >
                              Contacter tous les inscrits
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-ternary-dark border-none text-primary-light w-auto flex flex-col items-center">
                            <DialogHeader className="text-left w-full pb-4">
                              <DialogTitle className="text-xl">
                                Contacter les inscrits
                              </DialogTitle>
                            </DialogHeader>
                            {error && (
                              <p className="text-red-500 text-md text-center">
                                {error}
                              </p>
                            )}
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
                              onClick={() => {
                                contacter(inscription.inscrits);
                              }}
                            >
                              Contacter le conducteur
                            </Button>
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </div>
                </>
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default TrajetConducteur;
