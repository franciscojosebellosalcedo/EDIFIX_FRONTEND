import { useSelector } from "react-redux";
import type { TAuthUser } from "../modules/auth/types/auth.type";
import type { RootState } from "../store";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {

    const auth : TAuthUser = useSelector((state: RootState) => state.auth );

    return (
        !auth.accessToken ? <Navigate to={"/auth/login"} replace /> : <Outlet/>
    )
}

export default AuthGuard;