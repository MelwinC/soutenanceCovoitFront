import Cookies from "js-cookie";

import { Marque } from "@/types/marque";
import { Personne } from "@/types/personne";
import { Voiture } from "@/types/voiture";
import { getToken } from "./authService";
const API_URL = import.meta.env.VITE_API_URL;

export async function insertPersonne({
  prenom,
  nom,
  tel,
  email,
  id_compte,
  id_ville,
  token,
}: {
  prenom: string;
  nom: string;
  tel: string;
  email: string;
  id_compte: number;
  id_ville: number;
  token: string;
}): Promise<{ message: string }> {
  const response = await fetch(API_URL + "insertPersonne", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ prenom, nom, tel, email, id_compte, id_ville }),
  });
  const responseJson = await response.json();
  return responseJson;
}

export async function selectPersonne({
  id,
  token,
}: {
  id: number;
  token: string;
}): Promise<Personne | { message: string }> {
  const response = await fetch(API_URL + "selectPersonne", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ id }),
  });
  return await response.json();
}

export async function getPersonne(): Promise<
  { message: string; personne: Personne } | { message: string }
> {
  const token = Cookies.get("token");
  if (token) {
    const response = await fetch(API_URL + "getPersonne", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    return await response.json();
  } else {
    return { message: "Pas de token disponible" };
  }
}

export async function getProfile(): Promise<
  | {
      message: string;
      personne: Personne;
      voiture: Voiture;
      marque: Marque;
    }
  | { message: string; personne: Personne }
> {
  const token = getToken()!;
  const response = await fetch(API_URL + "getProfile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  return await response.json();
}

export async function updatePersonne({
  prenom,
  nom,
  tel,
  email,
  id_marque,
  modele,
  place,
}: {
  prenom: string;
  nom: string;
  tel: string;
  email: string;
  id_marque?: number;
  modele?: string;
  place?: number;
}): Promise<{ message: string }> {
  const token = getToken()!;
  const response = await fetch(API_URL + "updatePersonne", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ prenom, nom, tel, email, id_marque, modele, place }),
  });
  return await response.json();
}

export async function deleteVoiture(
  id_voiture: number
): Promise<{ message: string }> {
  const token = getToken()!;
  const response = await fetch(API_URL + "deleteVoiture", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify({ id_voiture }),
  });
  return await response.json();
}
