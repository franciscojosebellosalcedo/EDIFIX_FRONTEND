export type TUser = {

    usua_Id?: number;
    usua_RolId: number;
    usua_Nombre: string;
    usua_Contrasenia: string;
    usua_NombreUsuario: string;
    usua_Codigo?: string;
    usua_Activo?: boolean;
    usua_CreacionId?: number;
    usua_ModificacionId?: number;
    usua_Creacion?: Date;
    usua_Modificacion?: Date
}

export type TUserPermission = {
    peusua_Id?: number;
    peusua_OpcionId: number;
    peusua_UsuarioId?: number;
    peusua_Crear: boolean;
    peusua_Editar: boolean;
    peusua_CambiarStatus: boolean;
    peusua_CreacionId?: number;
    peusua_ModificacionId?: number;
    peusua_Creacion?: Date;
    peusua_Modificacion?: Date;
}

export type TDataUser = {
    user: TUser,
    permissions: TUserPermission[]
}