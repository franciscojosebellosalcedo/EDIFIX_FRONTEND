import {
    BrowserRouter,
    useRoutes
} from 'react-router-dom';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import Error404 from '../../modules/errors/components/Error404';

const AppRouter = () => {

    const Router = () => {

        return useRoutes([
            PrivateRoutes,
            PublicRoutes,
            {
                path: "*",
                element: <Error404/>
            }
        ]);

    }

    return (
        <BrowserRouter basename='/edifix/page/'>
            <Router />
        </BrowserRouter>
    );
};

export default AppRouter;