import type { FC } from "react";

type Props = {
    typeAlert: "success" | "warning" | "danger" | "info",
    message: string
}

const AlertMessage: FC<Props> = ({
    message,
    typeAlert
}) => {
    return (
        <div className={`mb-4 p-3 rounded border border-${typeAlert} bg-${typeAlert} bg-opacity-10`}>
            <div className={`d-flex align-items-center gap-2 text-${typeAlert}`}>
                <i className="bi bi-exclamation-circle-fill"></i>
                <span>{message}</span>
            </div>
        </div>
    )
}

export default AlertMessage;