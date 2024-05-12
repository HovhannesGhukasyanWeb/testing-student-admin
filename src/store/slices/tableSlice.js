import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";

const initialState = {
    data: [],
    total: 0,
    loading: true
};

export const fetchData = createAsyncThunk(
    'table/fetchData',
    async ({ endpoint, params }) => {
        const response = await baseApi.get(endpoint, { ...getAxiosConfig(), params });
        return response.data;
    }
);

const tableSlice = createSlice({
    name: "table",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.total = action.payload.totalData;
                state.loading = false;
            })
            .addCase(fetchData.rejected, (state) => {
                state.loading = false;
            })
    }
})


export default tableSlice.reducer;