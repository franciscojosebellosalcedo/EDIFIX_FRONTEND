import type { RouteObject } from "react-router-dom";
import { WarehousePage } from "./WarehousePages";

export const IndexPage : RouteObject = {
    path: "inventories",

    children: [
        WarehousePage
    ]
}

export default IndexPage;