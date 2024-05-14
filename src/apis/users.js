import baseApi from "./baseApi"
import { getAxiosConfig } from "./config";


export const get = async ({ limit = 10, search = null, page = 1, sortBy = 'id', sortDir = 'asc' }) => {
    return await baseApi.get("/api/admin/users", { ...getAxiosConfig(), params: { limit, search, page, sortBy, sortDir } });
}

export const show = async (id) => {
    return await baseApi.get(`/api/admin/users/${id}`, { ...getAxiosConfig(), params: { include: 'userProfile' } });
}

export const store = async (data) => {
    return await baseApi.post('/admin/users', data, getAxiosConfig());
}

export const update = async (id, data) => {
    return await baseApi.put(`/admin/users/${id}`, data, getAxiosConfig());
}

export const remove = async (id) => {
    return await baseApi.delete(`/admin/users/${id}`, getAxiosConfig());
}