export type TRol = {
    rol_Id?: number;
    rol_Nombre: string;
    rol_Descripcion: string;
    rol_Codigo?: string;
    rol_Activo?: boolean;
    rol_CreacionId?: number;
    rol_ModificacionId?: number;
    rol_Creacion?: Date;
    rol_Modificacion?: Date;

}

export type TRolPermission = {
    perol_Id?: number;
    perol_RolId?: number;
    perol_OpcionId: number;
    perol_Crear: boolean;
    perol_Editar: boolean;
    perol_Activo?: boolean;
    perol_CambiarStatus: boolean;
    perol_CreacionId?: number;
    perol_ModificacionId?: number;
    perol_Creacion?: Date;
    perol_Modificacion?: Date;
}

export type TSaveRol = {
    rol: TRol;
    permissions: TRolPermission[]
}
