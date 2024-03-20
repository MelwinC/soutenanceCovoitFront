const getCookie = (name: string) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const getToken = () => {
  return getCookie("token");
};

export const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}`;
};

export const removeCookies = () => {
  document.cookie = "token=;";
  document.cookie = "roles=;";
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const isUser = () => {
  const roles = getCookie("roles");
  if (!roles) {
    return false;
  }
  return roles.split(",").includes("utilisateur");
};

export const isAdmin = () => {
  const roles = getCookie("roles");
  if (!roles) {
    return false;
  }
  return roles.split(",").includes("admin");
};

export const isPersonne = () => {
  const roles = getCookie("roles");
  if (!roles) {
    return false;
  }
  return roles.split(",").includes("personne");
};
