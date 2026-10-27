import type { FC } from "react";
import StatusRecord from "../../../../shared/components/StatusRecord";
import { formattDate } from "../../../../shared/utils/common";
import type { TCategory } from "../../types/category.type";
import PermissionGuard from "../../../../guards/PermissionGuard";

type Props = {
    category: TCategory;
    changeStatus: (category: TCategory) => void;
    initUpdateCategory: (category: TCategory) => void;
}

const CategoryItem: FC<Props> = ({
    category,
    changeStatus,
    initUpdateCategory
}) => {
    return (
        <tr >
            <td style={{ fontSize: ".9rem" }} className=" fw-bold text-dark">
                {category.cate_Id}
            </td>

            <td style={{ fontSize: ".9rem" }} className="fw-bold text-dark">
                {category.cate_Nombre}
            </td>

            <td >
                <div style={{ fontSize: ".9rem" }} className="text-wrap fw-bold text-dark">

                    {category.cate_Codigo}
                </div>
            </td>

            <td>
                <StatusRecord
                    status={Boolean(category.cate_Activo)}
                />
            </td>

            <td style={{ fontSize: ".9rem" }} className=" fw-bold text-dark">
                {
                    formattDate(category.cate_Creacion)
                }
            </td>

            <td className="text-end">

                <PermissionGuard
                    action="update"
                    option="VENTAS_CATEGORIAS"
                >
                    <button
                        type="button"
                        className="btn btn-sm btn-light btn-icon me-2"
                        title="Editar"
                        onClick={(e) => {

                            e.currentTarget.blur();

                            initUpdateCategory(category);

                        }}
                    >
                        <i className="fa-sharp fa-solid fa-pen text-muted"></i>
                    </button>
                </PermissionGuard>

                <PermissionGuard
                    action="changeStatus"
                    option="VENTAS_CATEGORIAS"
                >
                    <button
                        type="button"
                        onClick={(e) => {

                            e.currentTarget.blur();

                            changeStatus(category);

                        }}
                        className="btn btn-sm btn-light btn-icon"
                        title={category.cate_Activo ? "Desactivar" : "Habilitar"}
                    >
                        <i
                            className={`fas ${category.cate_Activo
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

export default CategoryItem;