import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ReactNode } from "react"
import type { TMenu, TOptionMenu } from "../../layout/menu.type"

type LayoutState = {
    component: ReactNode | null;
    menu: TMenu[]
    options: TOptionMenu[]
}

const initialState: LayoutState = {
    component: null,
    menu: [],
    options: []
}

const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {

        setOptionsMenu: ( state, action: PayloadAction<TOptionMenu[]>) => {
            state.options = action.payload;
        },

        setSideMenu: ( state, action: PayloadAction<TMenu[]>) => {
            state.menu = action.payload;
        },

        setComponent: ( state, action: PayloadAction<ReactNode | null> ) =>{
            state.component = action.payload;
        }
    }
});

export const { setComponent, setSideMenu, setOptionsMenu } = layoutSlice.actions;
export default layoutSlice.reducer;