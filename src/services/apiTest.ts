import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

const token = getToken();

export async function testAll() {
  const response = await fetch(API_URL + "test/all");
  return await response.json();
}

export async function testUser() {
  const response = await fetch(API_URL + "test/utilisateur", {
    headers: {
      "x-access-token": token!,
    },
  });
  return await response.json();
}

export async function testPersonne() {
  const response = await fetch(API_URL + "test/personne", {
    headers: {
      "x-access-token": token!,
    },
  });
  return await response.json();
}

export async function testAdmin() {
  const response = await fetch(API_URL + "test/admin", {
    headers: {
      "x-access-token": token!,
    },
  });
  return await response.json();
}
