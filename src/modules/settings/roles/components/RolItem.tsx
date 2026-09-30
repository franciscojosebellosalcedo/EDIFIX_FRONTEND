import type { FC } from "react";
import StatusRecord from "../../../../shared/components/StatusRecord";
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

            <td className="text-end">
                {
                    actionEditRol ?
                        <button
                            type="button"
                            className="btn btn-sm btn-light btn-icon me-2"
                            title="Editar"
                        >
                            <i className="fa-sharp fa-solid fa-pen text-muted"></i>
                        </button>
                        : <></>
                }

                {
                    actionChangeRol ?
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
                        : <></>
                }
            </td>
        </tr>
    );
};

export default RolItem;