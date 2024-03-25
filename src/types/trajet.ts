import { Marque } from "./marque";
import { Personne } from "./personne";
import { Ville } from "./ville";
import { Voiture } from "./voiture";

export type Trajet = {
  id: number;
  kms: string;
  dateT: Date;
  place_proposees: string;
  personne: Personne;
  villeDep: Ville;
  villeArr: Ville;
  place_dispo: number;
};

export type DetailTrajet = {
  id: number;
  kms: string;
  dateT: Date;
  place_proposees: string;
  personne: Personne;
  villeDep: Ville;
  villeArr: Ville;
  place_dispo: number;
  voiture: Voiture[];
  marque: Marque;
};
