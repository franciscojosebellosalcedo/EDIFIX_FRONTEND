import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { TAuthUser } from "../../modules/auth/types/auth.type"

const initialState: TAuthUser = {
    user: null,
    accessToken: "",
    refressToken: "",
    permissions: [],
    rol: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin : ( state, action: PayloadAction<TAuthUser>) =>{
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.permissions = action.payload.permissions;
            state.rol = action.payload.rol;
            state.refressToken = action.payload.refressToken;
        },

        setLogout: ( state ) =>{
            state.user = null;
            state.accessToken = null;
            state.refressToken = null;
        }
    }
});

export const { setLogin , setLogout } = authSlice.actions;
export default authSlice.reducer;