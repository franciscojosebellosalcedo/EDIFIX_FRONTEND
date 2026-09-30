interface NotificationDrawerProps {
    onClose: () => void;
}

const NotificationDrawer = ({
    onClose,
}: NotificationDrawerProps) => {
    return (
        <>
            <button
                className="notification-drawer-backdrop"
                onClick={onClose}
                aria-label="Cerrar notificaciones"
            />

            <aside
                className="notification-drawer"
                aria-label="Panel de notificaciones"
            >
                <div className="drawer-header">
                    <div>
                        <h2>Notificaciones</h2>
                        <p>3 pendientes por revisar</p>
                    </div>

                    <button
                        className="drawer-close"
                        onClick={onClose}
                        aria-label="Cerrar panel"
                    >
                        <i className="bi bi-x-lg" />
                    </button>
                </div>

                <div className="drawer-list">
                    <div className="drawer-item">
                        <i className="bi bi-exclamation-circle text-danger" />

                        <div>
                            <strong>
                                Incidente crítico reportado
                            </strong>

                            <span>
                                Fuga de agua en baño — Piso 3 · Hace 38
                                min
                            </span>
                        </div>
                    </div>

                    <div className="drawer-item">
                        <i className="bi bi-wrench text-warning" />

                        <div>
                            <strong>Nueva orden asignada</strong>

                            <span>
                                Revisión de unidad HVAC — Torre A · Hace
                                12 min
                            </span>
                        </div>
                    </div>

                    <div className="drawer-item">
                        <i className="bi bi-box text-info" />

                        <div>
                            <strong>Stock bajo en almacén</strong>

                            <span>
                                7 artículos requieren reposición · Hace 1
                                h
                            </span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default NotificationDrawer;