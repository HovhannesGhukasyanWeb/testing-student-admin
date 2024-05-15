import baseApi from "../../../../apis/baseApi";
import { getAxiosConfig } from "../../../../apis/config";

export const getSubjects = async () =>  {
    return await  baseApi.get(endPoint, { ...getAxiosConfig(), params: { limit, search, page, sortBy, sortDir } });
}