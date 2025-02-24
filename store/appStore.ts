import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

export type AppDispatch = typeof appStore.dispatch;
const appStore = configureStore({ reducer: rootReducer });

export default appStore;
