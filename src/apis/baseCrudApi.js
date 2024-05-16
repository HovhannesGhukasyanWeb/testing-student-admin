import baseApi from "./baseApi"
import { getAxiosConfig } from "./config";


export const getApi = async (endPoint, params = null) => {
    return await baseApi.get(endPoint, { ...getAxiosConfig(), params});
}

export const showApi = async (endPoint, params) => {
    return await baseApi.get(endPoint, { ...getAxiosConfig(), params });
}

export const storeApi = async (endPoint, data) => {
    return await baseApi.post(endPoint, data, getAxiosConfig());
}

export const updateApi = async (endPoint, data) => {
    return await baseApi.put(endPoint, data, getAxiosConfig());
}

export const removeApi = async (endPoint) => {
    return await baseApi.delete(endPoint, getAxiosConfig());
}