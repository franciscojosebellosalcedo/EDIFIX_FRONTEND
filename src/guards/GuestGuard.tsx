import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import type { RootState } from '../store';

const GuestGuard = () => {
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken,
    );

    return accessToken ? (
        <Navigate
            to="/dashboard"
            replace
        />
    ) : (
        <Outlet />
    );
};

export default GuestGuard;