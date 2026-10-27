import type { RouteObject } from "react-router-dom";
import Materials from "../materials/components/Materials";

const MaterialPages : RouteObject = {
    path: "materials",

    children: [
        {
            element: <Materials/>,
            index: true
        }
    ]
}

export default MaterialPages;