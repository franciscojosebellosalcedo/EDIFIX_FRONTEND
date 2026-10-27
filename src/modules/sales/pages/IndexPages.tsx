import type { RouteObject } from "react-router-dom";
import CategoryPages from "./CategoryPages";
import ClientPages from "./ClientsPages";
import ProductPages from "./ProductPages";
import MaterialPages from "./MaterialPages";

const IndexPages : RouteObject = {

    path: "sales",

    children: [
        CategoryPages,
        ClientPages,
        ProductPages,
        MaterialPages
    ]
}

export default IndexPages;