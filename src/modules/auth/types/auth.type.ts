export type TAuthUser = {
    user: TUser | null,
    accessToken: string | null,
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