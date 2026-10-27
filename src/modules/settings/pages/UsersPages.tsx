import type { RouteObject } from "react-router-dom";
import { Users } from "../users/components/Users";
import FormUser from "../users/components/FormUser";

export const UsersRoutes: RouteObject = {

    path: "users",
    children: [
        {
            element: <Users/>,
            index: true
        },
        {
            path: "create",
            element: <FormUser/>
        },
        {
            path: "update/:id",
            element: <FormUser/>
        }
    ]

}