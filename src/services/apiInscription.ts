import { InscriptionConducteur } from "@/types/inscription";
import { Trajet } from "@/types/trajet";
import { getPersonne } from "./apiPersonne";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export async function insertInscription({
  id_trajet,
}: {
  id_trajet: number;
}): Promise<{ message: string }> {
  const token = getToken();
  if (token === undefined) {
    return { message: "Erreur token" };
  }
  const currentPersonne = await getPersonne();
  if ("personne" in currentPersonne) {
    const response = await fetch(API_URL + "insertInscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        id_trajet,
        id_personne: currentPersonne.personne.id,
      }),
    });
    return await response.json();
  } else {
    return { message: "Erreur lors de l'inscription au trajet" };
  }
}

export async function listeInscription(): Promise<{
  message: string;
  inscriptionsConducteur: InscriptionConducteur[];
  inscriptionsPassager: Trajet[];
}> {
  const token = getToken()!;
  const response = await fetch(API_URL + "listeInscription", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  return await response.json();
}

export async function deleteInscription({
  id_trajet,
  id_personne,
}: {
  id_trajet: number;
  id_personne: number;
}): Promise<{ message: string }> {
  const token = getToken();
  if (token === undefined) {
    return { message: "Erreur token" };
  }
  const response = await fetch(API_URL + "deleteInscription", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({
      id_trajet,
      id_personne,
    }),
  });
  return await response.json();
}
