import { useEffect, useState } from 'react';
import Sidebar from "../components/SideBar";
import Topbar from '../components/Topbar';
import NotificationDrawer from '../components/NotificationDrawer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use.dispatch';
import { setLogout } from '../../feactures/auth/authSlice';
import { KEY_REFRESS_TOKEN } from '../../constant/auth.constant';
import SubTopbar from './SubTopbar';

type MainLayoutProps = {
}

const MainLayout = ({
}: MainLayoutProps) => {
    
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();

    const [showNotifications, setShowNotifications] =
        useState(false);

    const [isLightTheme, setIsLightTheme] =
        useState(true);
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        document.documentElement.classList.toggle(
            'theme-light',
            isLightTheme,
        );
    }, [isLightTheme]);

    const onLogout = () =>{

        dispatch( setLogout() );

        localStorage.removeItem(KEY_REFRESS_TOKEN);

    }

    const handleNavigate = (value: string) => {

        setSidebarOpen(false);

        navigate( value );

    };

    return (
        <div className="bems-app">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="bems-main">
                <Topbar
                    onMenuOpen={() => setSidebarOpen(true)}
                    onNotifications={() =>
                        setShowNotifications(true)
                    }
                    onProfile={() =>
                        handleNavigate('Perfil')
                    }
                    onLogout={onLogout}
                    isLightTheme={isLightTheme}
                    onThemeToggle={() =>
                        setIsLightTheme(
                            (current) => !current,
                        )
                    }
                />
                
                <SubTopbar/>

                <div style={{ padding: "20px" }}>

                    <Outlet/>

                </div>

            </div>

            {showNotifications && (
                <NotificationDrawer
                    onClose={() =>
                        setShowNotifications(false)
                    }
                />
            )}
        </div>
    );
};

export default MainLayout;