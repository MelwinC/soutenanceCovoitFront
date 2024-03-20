import { Compte } from "@/types/compte";

const API_URL = import.meta.env.VITE_API_URL;

export async function signIn({
  pseudo,
  password,
}: {
  pseudo: string;
  password: string;
}): Promise<Compte> {
  const login = pseudo;
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });
  const compteData: Compte = await response.json();
  return compteData;
}

export async function signUp({
  pseudo,
  password,
}: {
  pseudo: string;
  password: string;
}) {
  const login = pseudo;
  const response = await fetch(API_URL + "register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });
  return await response.json();
}

// export async function registerAdmin() {
//   const response = await fetch(API_URL + "register/admin");
//   return await response.json();
// }
