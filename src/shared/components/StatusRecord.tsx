import type { FC } from "react";

type Props = {
    status: boolean;
    fs?: string
};

const StatusRecord: FC<Props> = ({ status, fs = ".8rem" }) => {
    return (
        <span style={{fontSize: fs}} className={`badge bg-${status ? "success" : "danger"}`}>
            {status ? "Activo" : "Inactivo"}
        </span>
    );
};

export default StatusRecord;