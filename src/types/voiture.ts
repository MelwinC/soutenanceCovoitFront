import { Marque } from "./marque";
import { Personne } from "./personne";

export type Voiture = {
  id: number;
  modele: string;
  place: number;
  immatriculation: string;
  personne: Personne;
  marque: Marque;
};
