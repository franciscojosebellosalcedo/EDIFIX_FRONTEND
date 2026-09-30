import type { RouteObject } from "react-router-dom";
import Roles from "../roles/components/Roles";
import FormRol from "../roles/components/FormRol";

export const RolesRoutes : RouteObject = {
    path: "rols",

    children: [
        {
            element: <Roles/>,
            index: true
        },
        {
            path: "create",
            element: <FormRol/>
        },
        {
            path: "update/:id",
            element: <FormRol/>
        },
    ]
}