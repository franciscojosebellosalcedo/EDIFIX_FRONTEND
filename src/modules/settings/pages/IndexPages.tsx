import type { RouteObject } from "react-router-dom";
import { UsersRoutes } from "./UsersRoutes";
import { RolesRoutes } from "./RolesRoutes";

const IndexRoutes: RouteObject = {

    path: "settings",

    children: [
        UsersRoutes,
        RolesRoutes
    ]
}

export default IndexRoutes;