export const APP_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_WEB_URL_DEV
    : import.meta.env.VITE_WEB_URL_RELEASE;

export const getAxiosConfig = () => {
  const token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : "";

  return {
    headers: { Authorization: "Bearer " + token },
  };
};
