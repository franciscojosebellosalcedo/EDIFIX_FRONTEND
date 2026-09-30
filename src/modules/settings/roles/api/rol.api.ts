import { HttpClient } from "../../../../shared/api/httpClient";
import type { TPagination } from "../../../../shared/types/pagination.type";
import type { TRol, TSaveRol } from "../../types/rol.type";

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

    create = async ( values: TSaveRol ) => {

        return this.post<TSaveRol>("/", values);

    };
}

export const rolApi = new RolApi();