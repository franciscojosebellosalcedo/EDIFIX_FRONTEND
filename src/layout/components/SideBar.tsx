
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { setSideMenu } from '../../feactures/layout/layoutSlice';
import { useAppDispatch } from '../../hooks/use.dispatch';
import { menuApi } from '../api/menu.api';
import type { TMenu } from '../menu.type';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const matchesRoute = (pathname: string, route: string): boolean => {
    const currentPath = pathname.replace(/\/+$/, '') || '/';
    const optionPath = route.replace(/\/+$/, '') || '/';

    return currentPath === optionPath ||
        (optionPath !== '/' && currentPath.startsWith(`${optionPath}/`));
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const [menu, setMenu] = useState<TMenu[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeModuleCode, setActiveModuleCode] = useState<string | null>(null);
    const [expandedSubmoduleCode, setExpandedSubmoduleCode] = useState<string | null>(null);
    const [flyoutTop, setFlyoutTop] = useState(12);

    const visibleMenu = useMemo(() => {
        return menu
            .filter(({ module }) => Boolean(module.modulo_Activo))
            .sort((a, b) => a.module.modulo_Orden - b.module.modulo_Orden)
            .map(({ module, submodules }) => ({
                module,
                submodules: submodules
                    .filter(({ submodule }) => Boolean(submodule.submo_Activo))
                    .map(({ submodule, options }) => ({
                        submodule,
                        options: options
                            .filter(option => Boolean(option.opcion_Activo))
                            .sort((a, b) => a.opcion_Orden - b.opcion_Orden),
                    }))
                    .sort((a, b) => a.submodule.submo_Orden - b.submodule.submo_Orden),
            }));
    }, [menu]);

    const activeRoute = useMemo(() => {
        const routes = visibleMenu.flatMap(({ submodules }) =>
            submodules.flatMap(({ options }) =>
                options.map(option => option.opcion_Ruta)
            )
        );

        return routes
            .filter(route => matchesRoute(pathname, route))
            .sort((a, b) => b.length - a.length)[0] ?? null;
    }, [pathname, visibleMenu]);

    const activeModule = useMemo(() => {
        if (!activeRoute) return null;

        return visibleMenu.find(({ submodules }) =>
            submodules.some(({ options }) =>
                options.some(option => option.opcion_Ruta === activeRoute)
            )
        ) ?? null;
    }, [activeRoute, visibleMenu]);

    const selectedModule = useMemo(() => {
        return visibleMenu.find(
            ({ module }) => String(module.modulo_Codigo) === activeModuleCode
        ) ?? null;
    }, [activeModuleCode, visibleMenu]);

    const loadMenu = useCallback(async () => {
        setLoading(true);

        try {
            const response = await menuApi.getMenu();
            const data = response.data as TMenu[];

            setMenu(data);
            dispatch(setSideMenu(data));
        } catch (error) {
            console.error('Error al cargar el menú:', error);
            setMenu([]);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        void loadMenu();
    }, [loadMenu]);

    useEffect(() => {
        if (!activeModule || activeModuleCode === null) return;

        if (String(activeModule.module.modulo_Codigo) !== activeModuleCode) return;

        const activeSubmodule = activeModule.submodules.find(({ options }) =>
            options.some(option => option.opcion_Ruta === activeRoute)
        );

        if (activeSubmodule) {
            setExpandedSubmoduleCode(
                String(activeSubmodule.submodule.submo_Codigo)
            );
        }
    }, [activeModule, activeModuleCode, activeRoute]);

    const closeFlyout = useCallback(() => {
        setActiveModuleCode(null);
        setExpandedSubmoduleCode(null);
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeFlyout();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [closeFlyout]);

    const handleModuleClick = (
        moduleCode: string,
        event: MouseEvent<HTMLButtonElement>
    ) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const panelHeight = Math.min(420, window.innerHeight - 24);
        const maxTop = Math.max(12, window.innerHeight - panelHeight - 12);
        const nextTop = Math.max(12, Math.min(rect.top - 8, maxTop));

        setFlyoutTop(nextTop);

        setActiveModuleCode(current => {
            if (current === moduleCode) {
                setExpandedSubmoduleCode(null);
                return null;
            }

            setExpandedSubmoduleCode(null);
            return moduleCode;
        });
    };

    const handleSubmoduleClick = (submoduleCode: string) => {
        setExpandedSubmoduleCode(current =>
            current === submoduleCode ? null : submoduleCode
        );
    };

    const handleOptionClick = () => {
        closeFlyout();
        onClose();
    };

    return (
        <>
            <aside
                className={`bems-sidebar ${isOpen ? 'sidebar-open' : ''}`}
                aria-label="Menú principal"
            >
                <div className="sidebar-brand">
                    <div className="sidebar-brand-icon">
                        <i className="bi bi-gem" aria-hidden="true" />
                    </div>

                    <div className="sidebar-brand-text">
                        <span className="sidebar-brand-title">ELE ROSE</span>
                        <span className="sidebar-brand-subtitle">
                            Administración comercial
                        </span>
                    </div>

                    <button
                        type="button"
                        className="sidebar-close d-lg-none"
                        onClick={onClose}
                        aria-label="Cerrar menú principal"
                    >
                        <i className="bi bi-x-lg" aria-hidden="true" />
                    </button>
                </div>

                <nav className="sidebar-nav" aria-label="Navegación principal">
                    {loading && (
                        <div className="sidebar-loading">
                            <span className="spinner-border spinner-border-sm" />
                            <span>Cargando menú...</span>
                        </div>
                    )}

                    {!loading && visibleMenu.length === 0 && (
                        <div className="sidebar-empty">
                            <i className="bi bi-menu-button-wide" aria-hidden="true" />
                            <span>No hay módulos disponibles.</span>
                        </div>
                    )}

                    {!loading && visibleMenu.map(({ module, submodules }) => {
                        const moduleCode = String(module.modulo_Codigo);
                        const isSelected = activeModuleCode === moduleCode;

                        const hasActiveRoute = submodules.some(({ options }) =>
                            options.some(option => option.opcion_Ruta === activeRoute)
                        );

                        return (
                            <button
                                type="button"
                                key={moduleCode}
                                className={[
                                    'nav-item',
                                    'nav-module-card',
                                    isSelected ? 'selected' : '',
                                    hasActiveRoute ? 'has-active-route' : '',
                                ].filter(Boolean).join(' ')}
                                onClick={event => handleModuleClick(moduleCode, event)}
                                aria-expanded={isSelected}
                                aria-haspopup="true"
                            >
                                <span className="nav-icon">
                                    <i
                                        className={`bi ${module.modulo_Icono}`}
                                        aria-hidden="true"
                                    />
                                </span>

                                <span className="nav-label fs-7">
                                    {module.modulo_Nombre}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                <div className="sidebar-bottom">
                    <span className="sidebar-bottom-icon">
                        <i className="bi bi-shield-check" aria-hidden="true" />
                    </span>
                    <span>Sistema de gestión</span>
                </div>
            </aside>

            {isOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop d-lg-none"
                    onClick={onClose}
                    aria-label="Cerrar menú principal"
                />
            )}

            {activeModuleCode !== null && selectedModule && (
                <>
                    <button
                        type="button"
                        className="menu-flyout-backdrop"
                        onClick={closeFlyout}
                        aria-label="Cerrar submenú"
                    />

                    <section
                        className="menu-flyout"
                        style={{
                            '--flyout-top': `${flyoutTop}px`,
                        } as CSSProperties}
                        aria-label={`Submenú de ${selectedModule.module.modulo_Nombre}`}
                    >
                        <header className="menu-flyout-header">
                            <div className="menu-flyout-header-icon">
                                <i
                                    className={`bi ${selectedModule.module.modulo_Icono}`}
                                    aria-hidden="true"
                                />
                            </div>

                            <div className="menu-flyout-header-text">
                                <span className="menu-flyout-eyebrow">MÓDULO</span>
                                <h6>{selectedModule.module.modulo_Nombre}</h6>
                            </div>

                            <button
                                type="button"
                                className="menu-flyout-close"
                                onClick={closeFlyout}
                                aria-label="Cerrar submenú"
                            >
                                <i className="bi bi-x-lg" aria-hidden="true" />
                            </button>
                        </header>

                        <div className="menu-flyout-content">
                            {selectedModule.submodules.length === 0 && (
                                <div className="flyout-empty">
                                    No hay opciones disponibles.
                                </div>
                            )}

                            {selectedModule.submodules.map(({ submodule, options }) => {
                                const submoduleCode = String(submodule.submo_Codigo);
                                const isExpanded = expandedSubmoduleCode === submoduleCode;
                                const panelId = `flyout-options-${submodule.submo_Id}`;

                                return (
                                    <section
                                        key={submodule.submo_Id}
                                        className={`flyout-group ${isExpanded ? 'expanded' : ''}`}
                                    >
                                        <button
                                            type="button"
                                            className="flyout-group-toggle"
                                            onClick={() =>
                                                handleSubmoduleClick(submoduleCode)
                                            }
                                            aria-expanded={isExpanded}
                                            aria-controls={panelId}
                                        >
                                            <span className="flyout-group-name">
                                                {submodule.submo_Nombre}
                                            </span>

                                            <i
                                                className={`bi ${
                                                    isExpanded
                                                        ? 'bi-chevron-up'
                                                        : 'bi-chevron-down'
                                                }`}
                                                aria-hidden="true"
                                            />
                                        </button>

                                        <div
                                            id={panelId}
                                            className="flyout-options"
                                            hidden={!isExpanded}
                                        >
                                            <div className="flyout-options-inner">
                                                {options.map(option => {
                                                    const isActive =
                                                        option.opcion_Ruta === activeRoute;

                                                    return (
                                                        <Link
                                                            key={option.opcion_Codigo}
                                                            to={option.opcion_Ruta}
                                                            className={`flyout-option ${
                                                                isActive ? 'active' : ''
                                                            }`}
                                                            aria-current={
                                                                isActive ? 'page' : undefined
                                                            }
                                                            onClick={handleOptionClick}
                                                        >
                                                            <span className="flyout-option-dot" />
                                                            <span>{option.opcion_Nombre}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </section>
                                );
                            })}
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default Sidebar;
