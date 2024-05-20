import { getApi } from "../../../../apis/baseCrudApi";
import handleError from "../../../../helpers/handleError";
import { fetchData } from "../../../../store/slices/tableSlice";
import { endpoint, params } from "../utils";

export const getDatas = () => async (dispatch) => {
    try{
        await dispatch(fetchData({ endpoint, params }));
    }catch(error){
        handleError(error);
    }
}

export const getTeachers = async () => {
    try{
        const data = await getApi('manager/teachers');
        return data.data.data;
    }catch(error){
        handleError(error);
    }
}

export const getGroupType = async () => {
    try{
        const data = await getApi('manager/group_types');
        return data.data.data;
    }catch(error){
        handleError(error);
    }
}

export const getGroups = async () => {
    try{
        const data = await getApi('manager/groups');
        return data.data.data;
    }catch(error){
        handleError(error);
    }
}