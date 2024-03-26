import { DetailTrajet, Trajet } from "@/types/trajet";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export async function listeTrajet(
  token: string
): Promise<{ message: string; trajets: Trajet[] } | { message: string }> {
  const response = await fetch(API_URL + "listeTrajet", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token!,
    },
  });
  return await response.json();
}

export async function getTrajet({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<{ message: string; trajet: DetailTrajet } | { message: string }> {
  const response = await fetch(API_URL + "getTrajet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ id }),
  });
  return await response.json();
}

export async function insertTrajet({
  id_personne,
  kms,
  dateT,
  place_proposees,
  id_ville_dep,
  id_ville_arr,
}: {
  id_personne: number;
  kms: string;
  dateT: string;
  place_proposees: number;
  id_ville_dep: number;
  id_ville_arr: number;
}): Promise<{ message: string }> {
  const token = getToken()!;
  const response = await fetch(API_URL + "insertTrajet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      id_personne,
      kms,
      dateT,
      place_proposees,
      id_ville_dep,
      id_ville_arr,
    }),
  });
  return await response.json();
}
