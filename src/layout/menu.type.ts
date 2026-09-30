
export type TModule = {
    modulo_Id?: number,
    modulo_Nombre: string,
    modulo_Icono: string,
    modulo_Codigo: string,
    modulo_Orden: number,
    modulo_Activo: boolean,
    modulo_Creacion?: Date,
    modulo_Modificacion?: Date
}

export type TOptionMenu = {
    opcion_Id?: number,
    opcion_ModuloId?: number,
    opcion_Nombre: string,
    opcion_Ruta: string,
    opcion_Codigo: string,
    opcion_Orden: number,
    opcion_Activo: boolean,
    opcion_Creacion?: Date,
    opcion_Modificacion?: Date,
}

export type TMenu = {

    module: TModule
    options: TOptionMenu[]

}