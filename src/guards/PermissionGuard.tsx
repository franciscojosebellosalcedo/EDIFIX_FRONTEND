
import { type FC, type ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/use.selector";
import NotPermission from "../shared/components/NotPermission";
import { ROLS_CODE } from "../shared/rols/rol.code";
import type { OPTIONS } from "../shared/menu/option.code";
import type { THandlerPermission } from "../shared/types/permission.type";

type Props = {
    children: ReactNode;
    option: keyof typeof OPTIONS;
    action: THandlerPermission;
    title?: string;
    withAlert?: boolean;
};

const PermissionGuard: FC<Props> = ({
    children,
    option,
    action,
    title,
    withAlert = false,
}) => {
    const { rol, permissions } = useAppSelector(
        (state) => state.auth
    );

    const options = useAppSelector(
        (state) => state.layout.options
    );

    const [hasPermission, setHasPermission] = useState(false);
    const [isValidating, setIsValidating] = useState(true);

    useEffect(() => {

        setIsValidating(true);

        if (rol?.rol_Codigo === ROLS_CODE.ADMIN) {
            setHasPermission(true);
            setIsValidating(false);
            return;
        }

        const optionFound = options.find(
            (item) => item.opcion_Codigo === option
        );

        if (!optionFound) {
            setHasPermission(false);
            setIsValidating(false);
            return;
        }

        const permission = permissions.find(
            (item) =>
                item.peusua_OpcionId === optionFound.opcion_Id
        );

        if (!permission) {
            setHasPermission(false);
            setIsValidating(false);
            return;
        }

        let allowed = false;

        switch (action) {
            case "access":
                allowed = true;
                break;

            case "add":
                allowed = permission.peusua_Crear;
                break;

            case "update":
                allowed = permission.peusua_Editar;
                break;

            case "changeStatus":
                allowed = permission.peusua_CambiarStatus;
                break;

            default:
                allowed = false;
        }

        setHasPermission(allowed);
        setIsValidating(false);
    }, [rol, permissions, options, option, action]);

    if (isValidating) {
        return null;
    }

    if (hasPermission) {
        return <>{children}</>;
    }

    if (withAlert) {
        return <NotPermission action={action} title={title ?? ""} />;
    }

    return null;
};

export default PermissionGuard;
