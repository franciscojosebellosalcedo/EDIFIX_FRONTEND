import type { RouteObject } from "react-router-dom";
import { Warehouses } from "../warehouses/components/Warehouses";

export const WarehousePage : RouteObject = {

    path: "warehouses",

    children: [
        {
            element: <Warehouses/>,
            index: true
        }
    ]
}