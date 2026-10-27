import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import StatusRecord from "../../../../shared/components/StatusRecord";
import { NAVIGATION } from "../../../../shared/navigation/navigation.tokens";
import { formattDate } from "../../../../shared/utils/common";
import { rolApi } from "../../roles/api/rol.api";
import type { TRol } from "../../types/rol.type";
import type { TUser } from "../../types/user.type";
import PermissionGuard from "../../../../guards/PermissionGuard";

type Props = {
    user: TUser
    changeStatus: (rol: TUser) => void;
}

const UserItem: FC<Props> = ({
    changeStatus,
    user
}) => {

    const [rolFound, setRolFound] = useState<TRol | null>(null);

    const navigate = useNavigate();

    const getRolById = async () => {

        try {

            const response = await rolApi.getOnlyRolById(user.usua_RolId);
            const data = response.data;

            if (data) {

                setRolFound(data);

            }

        } catch (error) {

            setRolFound(null);

        }

    }

    useEffect(() => {

        getRolById();

    }, [user.usua_RolId]);

    return (
        <tr >
            <td style={{ fontSize: ".9rem" }} className=" fw-bold text-dark">
                {user.usua_Id}
            </td>

            <td style={{ fontSize: ".9rem" }} className="fw-bold text-dark">
                {user.usua_Nombre}
            </td>

            <td >
                <div style={{ fontSize: ".9rem" }} className="text-wrap fw-bold text-dark">

                    {rolFound?.rol_Nombre}
                </div>
            </td>

            <td>
                <StatusRecord
                    status={Boolean(user.usua_Activo)}
                />
            </td>

            <td style={{ fontSize: ".9rem" }} className=" fw-bold text-dark">
                {
                    formattDate(user.usua_Creacion)
                }
            </td>

            <td className="text-end">
                <PermissionGuard
                    action="update"
                    option="CONFIGURACION_USUARIOS"
                >
                    <button
                        type="button"
                        className="btn btn-sm btn-light btn-icon me-2"
                        title="Editar"
                        onMouseDown={() => {

                            if (user.usua_Id) {

                                navigate(NAVIGATION.USER_UPDATE(user.usua_Id));

                            }

                        }}
                    >
                        <i className="fa-sharp fa-solid fa-pen text-muted"></i>
                    </button>
                </PermissionGuard>

                <PermissionGuard
                    action="changeStatus"
                    option="CONFIGURACION_USUARIOS"
                >
                    <button
                        type="button"
                        onMouseDown={() => changeStatus(user)}
                        className="btn btn-sm btn-light btn-icon"
                        title={user.usua_Activo ? "Desactivar" : "Habilitar"}
                    >
                        <i
                            className={`fas ${user.usua_Activo
                                ? "fa-toggle-off text-muted"
                                : "fa-toggle-on text-muted"
                                } fs-5`}
                        ></i>
                    </button>
                </PermissionGuard>
            </td>
        </tr >
    )
}

export default UserItem