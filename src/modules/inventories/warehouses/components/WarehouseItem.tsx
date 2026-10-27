import type { FC } from "react";
import PermissionGuard from "../../../../guards/PermissionGuard";
import StatusRecord from "../../../../shared/components/StatusRecord";
import { formattDate } from "../../../../shared/utils/common";
import type { TWarehouse } from "../../types/warehouse.type";

type Props = {
    warehouse: TWarehouse;
    changeStatus: (category: TWarehouse) => void;
    initUpdate: (category: TWarehouse) => void;
}

const WarehouseItem: FC<Props> = ({
    warehouse,
    changeStatus,
    initUpdate
}) => {
    return (
        <tr >
            <td style={{ fontSize: ".9rem" }} className=" fw-bold text-dark">
                {warehouse.alm_Id}
            </td>

            <td style={{ fontSize: ".9rem" }} className="fw-bold text-dark">
                {warehouse.alm_Nombre}
            </td>

            <td>
                <StatusRecord
                    status={Boolean(warehouse.alm_Activo)}
                />
            </td>

            <td style={{ fontSize: ".9rem" }} className=" fw-bold text-dark">
                {
                    formattDate(warehouse.alm_Creacion)
                }
            </td>

            <td className="text-end">

                <PermissionGuard
                    action="update"
                    option="INVENTARIOS_ALMACENES"
                >
                    <button
                        type="button"
                        className="btn btn-sm btn-light btn-icon me-2"
                        title="Editar"
                        onClick={(e) => {

                            e.currentTarget.blur();

                            initUpdate(warehouse);

                        }}
                    >
                        <i className="fa-sharp fa-solid fa-pen text-muted"></i>
                    </button>
                </PermissionGuard>

                <PermissionGuard
                    action="changeStatus"
                    option="INVENTARIOS_ALMACENES"
                >
                    <button
                        type="button"
                        onClick={(e) => {

                            e.currentTarget.blur();

                            changeStatus(warehouse);

                        }}
                        className="btn btn-sm btn-light btn-icon"
                        title={warehouse.alm_Activo ? "Desactivar" : "Habilitar"}
                    >
                        <i
                            className={`fas ${warehouse.alm_Activo
                                ? "fa-toggle-off text-muted"
                                : "fa-toggle-on text-muted"
                                } fs-5`}
                        ></i>
                    </button>
                </PermissionGuard>
            </td>

        </tr>
    )
}

export default WarehouseItem;