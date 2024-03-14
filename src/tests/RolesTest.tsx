import { useState, useEffect } from "react";

import { testAll, testUser, testPersonne, testAdmin } from "@/services/apiTest";

const RoleTest = () => {
  const [roleAll, setRoleAll] = useState({ message: "" });
  const [roleUser, setRoleUser] = useState({ message: "" });
  const [rolePersonne, setRolePersonne] = useState({ message: "" });
  const [roleAdmin, setRoleAdmin] = useState({ message: "" });

  useEffect(() => {
    const getData = async () => {
      let result = await testAll();
      setRoleAll(result);
      result = await testUser();
      setRoleUser(result);
      result = await testPersonne();
      setRolePersonne(result);
      result = await testAdmin();
      setRoleAdmin(result);
    };

    getData();
  }, []);

  return (
    <>
      <h1>All</h1>
      {roleAll ? (
        <div>
          <p>ID: {roleAll.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <br />
      <hr />
      <br />

      <h1>User</h1>
      {roleUser ? (
        <div>
          <p>ID: {roleUser.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <br />
      <hr />
      <br />

      <h1>Personne</h1>
      {rolePersonne ? (
        <div>
          <p>ID: {rolePersonne.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <br />
      <hr />
      <br />

      <h1>Admin</h1>
      {roleAdmin ? (
        <div>
          <p>ID: {roleAdmin.message}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default RoleTest;
