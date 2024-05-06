import baseApi from "./baseApi";

export const get = async () => {
    return await baseApi.get("/api/admin/roles");
}

export const show = async (id) => {
    return await baseApi.get(`/api/admin/roles/${id}`);
}

export const store = async (data) => {
    return await baseApi.post('/api/admin/roles', data);
}

export const update = async (id, data) => {
    return await baseApi.put(`/api/admin/roles/${id}`, data);
}

export const remove = async (id) => {
    return await baseApi.delete(`/api/admin/roles/${id}`);
}