import { Personne } from "./personne";
import { Trajet } from "./trajet";

export type InscriptionConducteur = {
  trajet: Trajet;
  inscrits: Personne[];
};
