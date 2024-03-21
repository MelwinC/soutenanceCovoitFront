import { Ville } from "@/types/ville";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

type VilleData = {
  message: string;
  villes: Ville[];
};

export async function listeVille(): Promise<VilleData> {
  const token = Cookies.get("token");
  if (token) {
    const response = await fetch(API_URL + "listeVille", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token!,
      },
    });
    return await response.json();
  } else {
    return { message: "NOK", villes: [] };
  }
}
