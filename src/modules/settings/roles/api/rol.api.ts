import { HttpClient } from "../../../../shared/api/httpClient";
import type { TPagination } from "../../../../shared/types/pagination.type";
import type { TDataRol, TRol, TSaveRol } from "../../types/rol.type";

export class RolApi extends HttpClient {

    constructor(){
        super("/rols");

    }

    changeStatusRolById = async ( idRol: number, currentStatus: boolean ) => {
        return this.put<TRol>(`/${idRol}/${ currentStatus ? "disable" : "enable"}`);
    }

    paginate = async ( page: number , limit: number ) => {
        return this.get<TPagination<TRol>>(`/paginate?page=${page}&limit=${limit}`);
    };

    update = async ( values: TSaveRol, id: number ) => {
        return this.put<TSaveRol>(`/${id}`, values );
    }

    search = async ( name: string ) => {
        return this.get<TRol[]>(`/search?name=${name}`);
    }

    getRolById = async ( id: number ) =>{
        return this.get<TDataRol | null>(`/${id}`);
    }

    getOnlyRolById = async ( id: number ) =>{
        return this.get<TRol | null>(`/${id}/only-rol`);
    }

    getOnlyActives = async ( ) =>{
        return this.get<TRol[]>(`/actives`);
    }

    create = async ( values: TSaveRol ) => {

        return this.post<TSaveRol>("/", values);

    };
}

export const rolApi = new RolApi();