const API_URL = import.meta.env.VITE_API_URL;

export async function testAll() {
  const response = await fetch(API_URL + "test/all");
  return await response.json();
}

export async function testUser() {
  const response = await fetch(API_URL + "test/utilisateur", {
    headers: {
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEwNDUzMjEwLCJleHAiOjE3MTA1Mzk2MTB9.dYvPKYx0zBScg-_72nomZmRjqMb-wr-jz8GEEofNcIc",
    },
  });
  return await response.json();
}

export async function testPersonne() {
  const response = await fetch(API_URL + "test/personne", {
    headers: {
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzEwNDU0MTA2LCJleHAiOjE3MTA1NDA1MDZ9.RydGcKReS1KbQxMpqEkrGgqAbWMW2jIGmUZEywGelw0",
    },
  });
  return await response.json();
}

export async function testAdmin() {
  const response = await fetch(API_URL + "test/admin", {
    headers: {
      "x-access-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEwNDU0MTA2LCJleHAiOjE3MTA1NDA1MDZ9.FRJEuPwGUUKiQ9Bih67L7URO9JNxahNvODdBS2cKexI",
    },
  });
  return await response.json();
}
