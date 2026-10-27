import type { FC } from "react"
import type { THandlerPermission } from "../types/permission.type"

type Props = {
    title: string
    action?: THandlerPermission
}

const NotPermission: FC<Props> = ({
    title,
    action
}) => {

    const getTextDescription = () => {
        if (action === "access") return "para acceder a";
        if (action === "add") return "para crear";
        if (action === "update") return "para editar";
        if (action === "changeStatus") return "para cambiar status a";

        return ""
    }

    return (
        <div>
            <h5 className="fw-fw-bold">{title}</h5>
            <p>No tiene permisos {getTextDescription()} {title.toLowerCase()}</p>
        </div>
    )
}

export default NotPermission