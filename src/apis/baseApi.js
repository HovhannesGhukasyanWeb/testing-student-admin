import axios from "axios";

const baseURL =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_BASE_URL_DEV
        : import.meta.env.VITE_BASE_URL_RELEASE;

const baseApi = axios.create({
    baseURL,
});

export default baseApi;