import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("token");
};

export const getIdCompte = () => {
  const jwt = getToken()!;
  const parts = jwt.split(".");
  const payload = JSON.parse(atob(parts[1]));
  return payload.id;
};

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value);
};

export const removeCookies = () => {
  Cookies.remove("token");
  Cookies.remove("roles");
};

export const isLoggedIn = () => {
  return isUser();
};

export const isUser = () => {
  const roles = Cookies.get("roles");
  if (!roles) {
    return false;
  }
  return roles.split(",").includes("utilisateur");
};

export const isAdmin = () => {
  const roles = Cookies.get("roles");
  if (!roles) {
    return false;
  }
  return roles.split(",").includes("admin");
};

export const isPersonne = () => {
  const roles = Cookies.get("roles");
  if (!roles) {
    return false;
  }
  return roles.split(",").includes("personne");
};
