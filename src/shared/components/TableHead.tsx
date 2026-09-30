import type { FC } from "react";
import type { TTableColumn } from "../types/table.types";

type Props = {
    columns: TTableColumn[]
}

const TableHead : FC<Props> = ({
    columns
}) => {
    return (
        <thead className="table-light" >
            <tr>
                {
                    columns.map((col) => {
                        return <td
                            className={`fs-6 fw-semibold text-body-secondary ${col.className}`}
                            key={ col.label }
                        >
                            {col.label}

                        </td>
                    })
                }
            </tr>
        </thead>
    )
}

export default TableHead;