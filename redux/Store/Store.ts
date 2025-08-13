// redux/Store/Store.ts
import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../apis/BlogApi";
import { adminApi } from "../apis/AdminApi";
import { categoryApi } from "../apis/Category";
import { contactApi } from "../apis/ContactApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [blogApi.reducerPath]: blogApi.reducer,
      [adminApi.reducerPath]: adminApi.reducer,
      [categoryApi.reducerPath]: categoryApi.reducer,
      [contactApi.reducerPath]: contactApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        blogApi.middleware,
        adminApi.middleware,
        categoryApi.middleware,
        contactApi.middleware
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
