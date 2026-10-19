import { Accordion, Form } from "react-bootstrap";
import { useAppSelector } from "../../../../hooks/use.selector";
import type { TMenu, TOptionMenu } from "../../../../layout/menu.type";
import type { THandlerPermission } from "../../../../shared/types/permission.type";
import type { FC } from "react";
import type { TRolPermission } from "../../types/rol.type";

type Props = {
    className: string;
    handlerPermission: (
        key: THandlerPermission,
        option: TOptionMenu
    ) => void;
    permissions: TRolPermission[];
};

const RolPermission: FC<Props> = ({
    className,
    handlerPermission,
    permissions
}) => {
    const menu: TMenu[] = useAppSelector(
        (state) => state.layout.menu
    );

    const getPermission = (
        idOption: number,
        key: THandlerPermission
    ): boolean => {
        const permissionFound = permissions.find(
            (item) => item.perol_OpcionId === idOption
        );

        switch (key) {
            case "access":
                return Boolean(permissionFound);
            case "add":
                return permissionFound?.perol_Crear ?? false;
            case "update":
                return permissionFound?.perol_Editar ?? false;
            case "changeStatus":
                return permissionFound?.perol_CambiarStatus ?? false;
            default:
                return false;
        }
    };

    return (
        <div className={className}>
            <div className="mb-3">
                <h6 className="fw-bold mb-1">Permisos del rol</h6>
                <small className="text-body-secondary">
                    Configura las acciones permitidas para cada módulo.
                </small>
            </div>

            <Accordion
                alwaysOpen
                className="border rounded-3 overflow-hidden"
            >
                {[...menu]
                    .sort(
                        (a, b) =>
                            a.module.modulo_Orden - b.module.modulo_Orden
                    )
                    .map((item, index) => (
                        <Accordion.Item
                            eventKey={String(index)}
                            key={item.module.modulo_Id ?? item.module.modulo_Codigo}
                        >
                            <Accordion.Header>
                                <div className="d-flex align-items-center gap-3">
                                    <span
                                        className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            backgroundColor: "#eeebff",
                                            color: "#7651d6"
                                        }}
                                    >
                                        <i
                                            className={`bi ${item.module.modulo_Icono} fs-5`}
                                        />
                                    </span>

                                    <span className="fw-semibold text-body">
                                        {item.module.modulo_Nombre}
                                    </span>
                                </div>
                            </Accordion.Header>

                            <Accordion.Body className="bg-body-tertiary">
                                <Accordion
                                    alwaysOpen
                                    flush
                                    className="d-flex flex-column gap-2"
                                >
                                    {[...item.submodules]
                                        .sort(
                                            (a, b) =>
                                                a.submodule.submo_Orden -
                                                b.submodule.submo_Orden
                                        )
                                        .map((submoduleItem, subIndex) => (
                                            <Accordion.Item
                                                eventKey={String(subIndex)}
                                                key={
                                                    submoduleItem.submodule.submo_Id ??
                                                    submoduleItem.submodule.submo_Codigo
                                                }
                                                className="border rounded-3 overflow-hidden"
                                            >
                                                <Accordion.Header>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <i className="bi bi-folder2-open text-secondary" />

                                                        <span className="fw-semibold">
                                                            {submoduleItem.submodule.submo_Nombre}
                                                        </span>
                                                    </div>
                                                </Accordion.Header>

                                                <Accordion.Body>
                                                    <div className="d-flex flex-column gap-2">
                                                        {[...submoduleItem.options]
                                                            .sort(
                                                                (a, b) =>
                                                                    a.opcion_Orden -
                                                                    b.opcion_Orden
                                                            )
                                                            .map((option) => {
                                                                const optionId = option.opcion_Id;

                                                                if (optionId == null) {
                                                                    return null;
                                                                }

                                                                const access = getPermission(
                                                                    optionId,
                                                                    "access"
                                                                );

                                                                return (
                                                                    <div
                                                                        key={optionId}
                                                                        className="bg-body border rounded-3 p-3"
                                                                    >
                                                                        <div className="row align-items-center g-3">
                                                                            <div className="col-12 col-lg">
                                                                                <div className="d-flex align-items-center gap-2">
                                                                                    <i
                                                                                        className={`bi ${access
                                                                                                ? "bi-check-circle-fill text-success"
                                                                                                : "bi-circle text-body-secondary"
                                                                                            }`}
                                                                                    />

                                                                                    <span className="fw-semibold">
                                                                                        {option.opcion_Nombre}
                                                                                    </span>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-12 col-lg-auto">
                                                                                <div className="d-flex flex-wrap align-items-center gap-3 gap-xl-4">
                                                                                    <PermissionSwitch
                                                                                        label="Acceso"
                                                                                        option={option}
                                                                                        checked={access}
                                                                                        onChange={() =>
                                                                                            handlerPermission(
                                                                                                "access",
                                                                                                option
                                                                                            )
                                                                                        }
                                                                                    />

                                                                                    <PermissionSwitch
                                                                                        label="Crear"
                                                                                        option={option}
                                                                                        checked={getPermission(
                                                                                            optionId,
                                                                                            "add"
                                                                                        )}
                                                                                        disabled={!access}
                                                                                        onChange={() =>
                                                                                            handlerPermission(
                                                                                                "add",
                                                                                                option
                                                                                            )
                                                                                        }
                                                                                    />

                                                                                    <PermissionSwitch
                                                                                        label="Editar"
                                                                                        option={option}
                                                                                        checked={getPermission(
                                                                                            optionId,
                                                                                            "update"
                                                                                        )}
                                                                                        disabled={!access}
                                                                                        onChange={() =>
                                                                                            handlerPermission(
                                                                                                "update",
                                                                                                option
                                                                                            )
                                                                                        }
                                                                                    />

                                                                                    <PermissionSwitch
                                                                                        label="Cambiar estado"
                                                                                        option={option}
                                                                                        checked={getPermission(
                                                                                            optionId,
                                                                                            "changeStatus"
                                                                                        )}
                                                                                        disabled={!access}
                                                                                        onChange={() =>
                                                                                            handlerPermission(
                                                                                                "changeStatus",
                                                                                                option
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}

                                                        {submoduleItem.options.length === 0 && (
                                                            <div className="text-center text-body-secondary small py-3">
                                                                Este submódulo no tiene opciones.
                                                            </div>
                                                        )}
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        ))}

                                    {item.submodules.length === 0 && (
                                        <div className="text-center text-body-secondary py-3">
                                            <i className="bi bi-inbox fs-4 d-block mb-2" />
                                            Este módulo no tiene submódulos.
                                        </div>
                                    )}
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
            </Accordion>
        </div>
    );
};

type PermissionSwitchProps = {
    label: string;
    checked: boolean;
    option: TOptionMenu;
    disabled?: boolean;
    onChange: () => void;
};

const PermissionSwitch: FC<PermissionSwitchProps> = ({
    label,
    checked,
    option,
    disabled,
    onChange
}) => {
    return (
        <Form.Check
            type="switch"
            id={`permission-${label}-${option.opcion_Id}`}
            label={label}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="mb-0 text-nowrap"
        />
    );
};

export default RolPermission;