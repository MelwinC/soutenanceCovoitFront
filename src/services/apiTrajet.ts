import { DetailTrajet, Trajet } from "@/types/trajet";

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
