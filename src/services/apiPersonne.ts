import { Personne } from "@/types/personne";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

const token = Cookies.get("token");

export async function insertPersonne({
  prenom,
  nom,
  tel,
  email,
  id_compte,
  id_ville,
}: {
  prenom: string;
  nom: string;
  tel: string;
  email: string;
  id_compte: number;
  id_ville: number;
}): Promise<{ message: string }> {
  if (token) {
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
  } else {
    return { message: "NOK" };
  }
}

export async function selectPersonne({
  id,
}: {
  id: number;
}): Promise<Personne | { message: string }> {
  if (token) {
    const response = await fetch(API_URL + "selectPersonne", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ id }),
    });
    return await response.json();
  } else {
    return { message: "Pas de token disponible" };
  }
}

export async function getPersonne(): Promise<
  { message: string; personne: Personne } | { message: string }
> {
  if (token) {
    const response = await fetch(API_URL + "getPersonne", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token!,
      },
    });
    return await response.json();
  } else {
    return { message: "Pas de token disponible" };
  }
}
