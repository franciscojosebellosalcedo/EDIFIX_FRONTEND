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
    ) => {

        const permissionFound = permissions.find(
            (item) => item.perol_OpcionId === idOption
        );

        if (key === "access") {
            return Boolean(permissionFound);
        }

        if (key === "add") {
            return permissionFound?.perol_Crear ?? false;
        }

        if (key === "update") {
            return permissionFound?.perol_Editar ?? false;
        }

        if (key === "changeStatus") {
            return permissionFound?.perol_CambiarStatus ?? false;
        }

        return false;
    };

    return (
        <div className={className}>

            <Accordion defaultActiveKey="0">

                {menu.map((item, index) => (

                    <Accordion.Item
                        eventKey={String(index)}
                        key={item.module.modulo_Id}
                    >

                        <Accordion.Header>

                            <div className="d-flex align-items-center gap-2">
                                <i
                                    className={`${item.module.modulo_Icono} fs-5`}
                                />

                                <span className="fw-semibold">
                                    {item.module.modulo_Nombre}
                                </span>
                            </div>

                        </Accordion.Header>

                        <Accordion.Body>

                            <div className="d-flex flex-column gap-2">

                                {item.options.map((option) => {

                                    const optionId = option.opcion_Id!;

                                    const access = getPermission(
                                        optionId,
                                        "access"
                                    );

                                    return (
                                        <div
                                            key={optionId}
                                            className="border rounded-3 p-3"
                                        >

                                            <div className="row align-items-center g-3">

                                                {/* Opción */}
                                                <div className="col-12 col-md">

                                                    <div className="fw-semibold">
                                                        {option.opcion_Nombre}
                                                    </div>

                                                </div>

                                                {/* Permisos */}
                                                <div className="col-12 col-md-auto">

                                                    <div className="d-flex flex-wrap gap-4">

                                                        <PermissionSwitch
                                                            label="Acceso"
                                                            option={ option }
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
                                                            option={ option }
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
                                                            option={ option }
                                                            label="Editar"
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
                                                            label="Cambiar status"
                                                            option = { option }
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

                            </div>

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
        />
    );
};

export default RolPermission;