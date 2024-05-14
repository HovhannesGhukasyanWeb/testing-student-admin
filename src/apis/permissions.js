import baseApi from "./baseApi";
import { getAxiosConfig } from "./config";

export const get = async () => {
    return await baseApi.get("/api/admin/permissions", { ...getAxiosConfig() });
}

export const show = async (id) => {
    return await baseApi.get(`/api/admin/permissions/${id}`, { ...getAxiosConfig(), params: { include: 'rolePermissions' } });
}

export const store = async (data) => {
    return await baseApi.post('/api/admin/permissions', data, { ...getAxiosConfig() });
}

export const update = async (id, data) => {
    return await baseApi.put(`/api/admin/permissions/${id}`, data, { ...getAxiosConfig() });
}

export const remove = async (id) => {
    return await baseApi.delete(`/api/admin/permissions/${id}`, { ...getAxiosConfig() });
}