import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import PermissionGuard from "../../../../guards/PermissionGuard";
import { ROL_CODE } from "../../../../layout/constant";
import StatusRecord from "../../../../shared/components/StatusRecord";
import { NAVIGATION } from "../../../../shared/navigation/navigation.tokens";
import { formattDate } from "../../../../shared/utils/common";
import type { TRol } from "../../types/rol.type";

type Props = {
    rol: TRol;
    changeStatusRol: (rol: TRol) => void;
    actionEditRol: boolean;
    actionChangeRol: boolean
};

const RolItem: FC<Props> = ({
    rol,
    changeStatusRol,
    actionEditRol,
    actionChangeRol
}) => {

    const navigate = useNavigate();

    return (
        <tr >
            <td style={{ fontSize: ".9rem" }} className=" fw-bold text-dark">
                {rol.rol_Id}
            </td>

            <td style={{ fontSize: ".9rem" }} className="fw-bold text-dark">
                {rol.rol_Nombre}
            </td>

            <td >
                <div style={{ fontSize: ".9rem" }} className="text-wrap fw-bold text-dark">

                    {rol.rol_Descripcion}
                </div>
            </td>

            <td>
                <StatusRecord
                    status={Boolean(rol.rol_Activo)}
                />
            </td>

            <td style={{ fontSize: ".9rem" }} className=" fw-bold text-dark">
                {
                    formattDate(rol.rol_Creacion)
                }
            </td>

            {
                rol.rol_Codigo === ROL_CODE.ADMIN ? "" :
                    <td className="text-end">
                        {
                            actionEditRol ?
                                <PermissionGuard
                                    action="update"
                                    option="CONFIGURACION_ROLES"
                                >
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light btn-icon me-2"
                                        title="Editar"
                                        onClick={() => {

                                            if (rol.rol_Id) {

                                                navigate(NAVIGATION.ROL_UPDATE(rol.rol_Id));

                                            }

                                        }}
                                    >
                                        <i className="fa-sharp fa-solid fa-pen text-muted"></i>
                                    </button>
                                </PermissionGuard>
                                : <></>
                        }

                        {
                            actionChangeRol ?
                                <PermissionGuard
                                    action="changeStatus"
                                    option="CONFIGURACION_ROLES"
                                >
                                    <button
                                        type="button"
                                        onMouseDown={() => changeStatusRol(rol)}
                                        className="btn btn-sm btn-light btn-icon"
                                        title={rol.rol_Activo ? "Desactivar" : "Habilitar"}
                                    >
                                        <i
                                            className={`fas ${rol.rol_Activo
                                                ? "fa-toggle-off text-muted"
                                                : "fa-toggle-on text-muted"
                                                } fs-5`}
                                        ></i>
                                    </button>
                                </PermissionGuard>
                                : <></>
                        }
                    </td>
            }
        </tr>
    );
};

export default RolItem;