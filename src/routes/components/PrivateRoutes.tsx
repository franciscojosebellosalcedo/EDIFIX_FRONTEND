import { Navigate, type RouteObject } from "react-router-dom";
import MainLayout from "../../layout/components/MainLayout";
import { DashboardRoutes } from "../../modules/dashboard/pages/DashboardRoutes";
import SettingsRoutes from "../../modules/settings/pages/IndexPages";
import AuthGuard from "../../guards/AuthGuard";

export const PrivateRoutes: RouteObject = {
    element: <AuthGuard/>,
    children: [
        {
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <Navigate
                            to="dashboard"
                            replace
                        />
                    ),
                },
                DashboardRoutes,
                SettingsRoutes
            ]
        }
    ]
}