const getCookie = (name: string) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const getToken = () => {
  return getCookie("token");
};

export const setToken = (token: string) => {
  document.cookie = `token=${token}`;
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const removeToken = () => {
  document.cookie = "token=;";
};
