import { Marque } from "@/types/marque";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

export async function listeMarque(): Promise<{
  message: string;
  marques: Marque[];
}> {
  const token = getToken()!;
  const response = await fetch(API_URL + "listeMarque", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  return await response.json();
}
