import { useEffect, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import { useLocation } from 'react-router-dom';
import { NAME_ACTION, NAME_MODULE, NAME_OPTION } from '../constant';

interface TopbarProps {
    onMenuOpen: () => void;
    onNotifications: () => void;
    onProfile: () => void;
    onLogout: () => void;
    isLightTheme: boolean;
    onThemeToggle: () => void;
}

const Topbar = ({
    onMenuOpen,
    onNotifications,
    onProfile,
    onLogout,
}: TopbarProps) => {

    const [showProfileMenu, setShowProfileMenu] =
        useState(false);

    const location = useLocation();

    const [breadcrumb , setBreadcrumb ] = useState<string | null>(null);

    const getBreadcrumb = () =>{

        const parts = location.pathname.split("/").filter((item) => item !== "/" && item !== "");

        const module = parts[0];
        const option = parts[1];
        const action = parts[2];

        const value = `${module ? `> ${NAME_MODULE[module as keyof typeof NAME_MODULE] }`: ""}${option ? ` > ${NAME_OPTION[option as keyof typeof NAME_OPTION]}`: ""}${action ? ` > ${NAME_ACTION[action as keyof typeof NAME_ACTION]}` : ""} `

        setBreadcrumb( value );
    }

    useEffect(()=>{

        getBreadcrumb();

    },[ location ]);
    
    return (
        <header className="topbar">
            <button
                className="menu-toggle d-lg-none"
                onClick={onMenuOpen}
                aria-label="Abrir menú"
            >
                <i className="bi bi-list" />
            </button>

            <div className="breadcrumb-wrap">
                <span>Inicio</span>
                {/* <i className="bi bi-chevron-right" /> */}
                <strong>{breadcrumb}</strong>
            </div>

            <div className="topbar-actions">
                <div className="search-box">
                    <i className="bi bi-search" />
                    <input
                        aria-label="Buscar"
                        placeholder="Buscar en EDIFIX..."
                    />
                </div>

                <button
                    className="icon-btn notification-btn"
                    onClick={onNotifications}
                    aria-label="Notificaciones"
                >
                    <i className="bi bi-bell" />
                    <span>3</span>
                </button>

                <div className="topbar-divider" />

                <button
                    className="mini-avatar avatar-trigger"
                    onClick={() =>
                        setShowProfileMenu((current) => !current)
                    }
                    aria-label="Abrir menú de perfil"
                >
                    MC
                </button>

                {showProfileMenu && (
                    <ProfileMenu
                        onProfile={onProfile}
                        onLogout={onLogout}
                    />
                )}
            </div>
        </header>
    );
};

export default Topbar;