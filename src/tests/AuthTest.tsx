import { useEffect, useState } from "react";

import { loginAdmin, loginCompte, loginPersonne } from "@/services/apiAuth";
import { Compte } from "@/types/compte";

const AuthTest = () => {
  const [dataCompte, setDataCompte] = useState<Compte | undefined>(undefined);
  const [dataPersonne, setDataPersonne] = useState<Compte | undefined>(
    undefined
  );
  const [dataAdmin, setDataAdmin] = useState<Compte | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      let result = await loginCompte();
      setDataCompte(result);
      result = await loginPersonne();
      setDataPersonne(result);
      result = await loginAdmin();
      setDataAdmin(result);
    };

    getData();
  }, []);

  return (
    <>
      <h1>Compte</h1>
      {dataCompte ? (
        <div>
          <p>ID: {dataCompte.id}</p>
          <p>Login: {dataCompte.login}</p>
          <p>Roles: {dataCompte.roles.join(", ")}</p>
          <p>Access Token: {dataCompte.accessToken}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <br />
      <hr />
      <br />

      <h1>Personne</h1>
      {dataPersonne ? (
        <div>
          <p>ID: {dataPersonne.id}</p>
          <p>Login: {dataPersonne.login}</p>
          <p>Roles: {dataPersonne.roles.join(", ")}</p>
          <p>Access Token: {dataPersonne.accessToken}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <br />
      <hr />
      <br />

      <h1>Admin</h1>
      {dataAdmin ? (
        <div>
          <p>ID: {dataAdmin.id}</p>
          <p>Login: {dataAdmin.login}</p>
          <p>Roles: {dataAdmin.roles.join(", ")}</p>
          <p>Access Token: {dataAdmin.accessToken}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default AuthTest;
