import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ReactNode } from "react"
import type { TMenu } from "../../layout/menu.type"

type LayoutState = {
    component: ReactNode | null;
    menu: TMenu[]
}

const initialState: LayoutState = {
    component: null,
    menu: []
}

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {

        setSideMenu: ( state, action: PayloadAction<TMenu[]>) => {
            state.menu = action.payload;
        },

        setComponent: ( state, action: PayloadAction<ReactNode | null> ) =>{
            state.component = action.payload;
        }
    }
});

export const { setComponent, setSideMenu } = layoutSlice.actions;
export default layoutSlice.reducer;