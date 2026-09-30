import type { RouteObject } from "react-router-dom";
import GuestGuard from "../../guards/GuestGuard";
import { AuthRoutes } from "../../modules/auth/pages/AuthRoutes";

export const PublicRoutes: RouteObject = {
    
    element: <GuestGuard/>,

    children: [
        AuthRoutes
    ]
}