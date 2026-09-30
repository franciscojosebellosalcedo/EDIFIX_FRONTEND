import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSideMenu } from '../../feactures/layout/layoutSlice';
import { useAppDispatch } from '../../hooks/use.dispatch';
import { menuApi } from '../api/menu.api';
import type { TMenu } from '../menu.type';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({
    isOpen,
    onClose,
}: SidebarProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState<string[]>([]);
    const [menu, setMenu] = useState<TMenu[]>([]);

    const currentPath = location.pathname;

    const dispatch = useAppDispatch();

    const isOptionActive = (route: string) => {
        return (
            currentPath === route ||
            currentPath.startsWith(`${route}/`)
        );
    };

    const toggleExpanded = (code: string) => {
        setExpanded((current) =>
            current.includes(code)
                ? current.filter((item) => item !== code)
                : [...current, code],
        );
    };

    const getMenu = async () => {
        try {
            const response = await menuApi.getMenu();

            setMenu(response.data);

            dispatch( setSideMenu( response.data ) );

        } catch (error) {
            setMenu([]);
        }
    };

    useEffect(() => {
        getMenu();
    }, []);

    const getMenuActive = (): TMenu[] => {
        return menu
            .filter(({ module }) => module.modulo_Activo)
            .map(({ module, options }) => ({
                module,
                options: options.filter(
                    (option) => option.opcion_Activo,
                ),
            }))
            .filter(({ options }) => options.length > 0);
    };

    useEffect(() => {
        if (!menu.length || !currentPath) return;

        const activeModule = menu.find(({ options }) =>
            options.some((option) =>
                isOptionActive(option.opcion_Ruta),
            ),
        );

        if (!activeModule) return;

        const moduleCode = activeModule.module.modulo_Codigo;

        setExpanded((current) =>
            current.includes(moduleCode)
                ? current
                : [...current, moduleCode],
        );
    }, [menu, currentPath]);

    return (
        <>
            <aside
                className={`bems-sidebar ${
                    isOpen ? 'is-open' : ''
                }`}
            >
                <div className="sidebar-brand">

                    <div className="brand-mark">
                        <i className="bi bi-buildings-fill" />
                    </div>

                    <div>
                        <strong>EDIFIX</strong>
                        <span>Gestión de edificios</span>
                    </div>

                    <button
                        type="button"
                        className="sidebar-close d-lg-none"
                        onClick={onClose}
                        aria-label="Cerrar menú"
                    >
                        <i className="bi bi-x-lg" />
                    </button>

                </div>

                <nav
                    className="sidebar-nav mt-2"
                    aria-label="Navegación principal"
                >
                    {getMenuActive().map(({ module, options }) => {

                        const moduleCode = module.modulo_Codigo;

                        const isModuleActive = options.some(
                            (option) =>
                                isOptionActive(
                                    option.opcion_Ruta
                                )
                        );

                        return (
                            <div key={moduleCode}>

                                <button
                                    type="button"
                                    className={`nav-item ${
                                        isModuleActive
                                            ? 'active'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        toggleExpanded(moduleCode)
                                    }
                                >
                                    <i
                                        className={`bi ${module.modulo_Icono}`}
                                    />

                                    <span className='fs-6'>
                                        {module.modulo_Nombre}
                                    </span>

                                    <i
                                        className={`bi ms-auto chevron ${
                                            expanded.includes(
                                                moduleCode,
                                            )
                                                ? 'bi-chevron-up'
                                                : 'bi-chevron-down'
                                        }`}
                                    />
                                </button>

                                {expanded.includes(moduleCode) && (
                                    <div className="nav-children">

                                        {options
                                            .sort(
                                                (a, b) =>
                                                    a.opcion_Orden -
                                                    b.opcion_Orden,
                                            )
                                            .map((option) => (

                                                <button
                                                    type="button"
                                                    key={
                                                        option.opcion_Codigo
                                                    }
                                                    style={{
                                                        fontSize: ".9rem"
                                                    }}
                                                    className={`child-item ${
                                                        isOptionActive(
                                                            option.opcion_Ruta,
                                                        )
                                                            ? 'active'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        navigate(
                                                            option.opcion_Ruta,
                                                        )
                                                    }
                                                >
                                                    {option.opcion_Nombre}
                                                </button>

                                            ))}

                                    </div>
                                )}

                            </div>
                        );
                    })}
                </nav>

                <div className="sidebar-bottom">
                    <div className="profile">

                        <div className="avatar">
                            MC
                        </div>

                        <div>
                            <strong>María Castillo</strong>
                            <span>Administradora</span>
                        </div>

                        <i className="bi bi-three-dots ms-auto" />

                    </div>
                </div>
            </aside>

            {isOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop d-lg-none"
                    onClick={onClose}
                    aria-label="Cerrar menú"
                />
            )}
        </>
    );
};

export default Sidebar;