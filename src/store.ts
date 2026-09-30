import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feactures/auth/authSlice";
import layoutReducer from "./feactures/layout/layoutSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        layout: layoutReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ["layout.component"],
                ignoredActions: ["layout/setComponent"]
            },
        })
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;