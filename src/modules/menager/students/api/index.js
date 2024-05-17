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