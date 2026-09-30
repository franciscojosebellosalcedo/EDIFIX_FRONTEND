import type { RouteObject } from "react-router-dom";
import Login from "../components/Login";

export const AuthRoutes: RouteObject = {
    path: "auth",
    children: [
        {
            path: "login",
            element: <Login/>,
        }
    ]
}