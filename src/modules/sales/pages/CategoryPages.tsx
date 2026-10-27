import type { RouteObject } from "react-router-dom";
import Category from "../categories/components/Category";

const CategoryPages: RouteObject = {

    path: "categories",

    children: [
        {
            element: <Category/>,
            index: true
        }
    ]
}

export default CategoryPages;