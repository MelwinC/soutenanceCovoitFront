import { Compte } from "../types/compte";
const API_URL = import.meta.env.VITE_API_URL;

export async function loginCompte(): Promise<Compte> {
  const data = {
    login: "user",
    password: "test",
  };
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const compteData: Compte = await response.json();
  return compteData;
}

export async function loginPersonne() {
  const data = {
    login: "bob",
    password: "test",
  };
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function loginAdmin() {
  const data = {
    login: "admin",
    password: "test",
  };
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function register() {
  const response = await fetch(API_URL + "register");
  return await response.json();
}

export async function registerAdmin() {
  const response = await fetch(API_URL + "register/admin");
  return await response.json();
}
