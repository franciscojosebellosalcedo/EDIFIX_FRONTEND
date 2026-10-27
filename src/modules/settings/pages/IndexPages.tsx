import type { RouteObject } from "react-router-dom";
import { UsersRoutes } from "./UsersPages";
import { RolesRoutes } from "./RolesPages";

const IndexRoutes: RouteObject = {

    path: "settings",

    children: [
        UsersRoutes,
        RolesRoutes
    ]
}

export default IndexRoutes;