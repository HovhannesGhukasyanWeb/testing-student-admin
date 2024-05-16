import handleError from "../../../../helpers/handleError";
import { fetchData } from "../../../../store/slices/tableSlice";
import params from "../utils/params";

export const getDatas = () => async (dispatch) => {
    try{
        await dispatch(fetchData({ endpoint: "/manager/students", params }));
    }catch(error){
        handleError(error);
    }
}