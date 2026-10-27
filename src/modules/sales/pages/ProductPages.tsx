import type { RouteObject } from "react-router-dom";
import Products from "../products/components/Products";

const ProductPages: RouteObject = {

    path: "products",

    children: [
        {
            element: <Products/>,
            index: true
        }
    ]
}

export default ProductPages;