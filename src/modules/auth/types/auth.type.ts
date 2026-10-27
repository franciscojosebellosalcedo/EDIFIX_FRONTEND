import type { TRol } from "../../settings/types/rol.type";
import type { TUserPermission } from "../../settings/types/user.type";

export type TAuthUser = {
    user: TUser | null,
    permissions: TUserPermission[]
    accessToken: string | null,
    rol: TRol | null
    refressToken: string | null
}

type TUser = {
    usua_Id: number;
    usua_Nombre: string;
    usua_Codigo: string;
    usua_RolId: number;
}

export type TLogin = {
    usua_NombreUsuario: string,
    usua_Contrasenia: string,
}