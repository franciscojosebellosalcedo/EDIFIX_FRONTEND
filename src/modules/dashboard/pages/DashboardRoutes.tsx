import type { RouteObject } from "react-router-dom";
import Dashboard from "../components/Dashboard";

export const DashboardRoutes: RouteObject = {
    path: "dashboard",
    element: <Dashboard/>
}