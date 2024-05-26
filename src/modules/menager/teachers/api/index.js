import baseApi from "../../../../apis/baseApi";
import { getApi, updateApi } from "../../../../apis/baseCrudApi";
import handleError from "../../../../helpers/handleError";
import { fetchData } from "../../../../store/slices/tableSlice";

export const getSubjects = async () => {
    try{
        const data = await getApi('manager/subjects');
        return data.data.data;
    }catch(error){
        handleError(error);
    }   
}

export const getDatas = () => async (dispatch) => {
    try{
        await dispatch(fetchData({ endpoint: "/manager/teachers", params: { include: 'userProfile&teacherSubjects' } }));
    }catch(error){
        handleError(error);
    }
}

export const saveTeacherSubjects = async (id, datas) => {
    let subject_ids = datas.map(data => data.value);
    return await updateApi(`manager/teachers/subjects/${id}`, {subject_ids});
}