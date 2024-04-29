import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import userSlice from "./slices/userSlice";

const persistConfig = {
    key: "testing-student-admin",
    storage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => [thunk],
});

export const persistor = persistStore(store);
