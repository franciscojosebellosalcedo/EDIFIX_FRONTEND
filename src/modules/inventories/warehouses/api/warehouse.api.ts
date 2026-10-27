import { HttpClient } from "../../../../shared/api/httpClient";
import type { TPagination } from "../../../../shared/types/pagination.type";
import type { TWarehouse } from "../../types/warehouse.type";

class WarehouseApi extends HttpClient {

    constructor(){
        super("/warehouses");
    };

    create = async ( values: TWarehouse ) =>{
        return this.post<TWarehouse>("/", values );
    }

    update = async ( id: number, values: TWarehouse ) =>{
        return this.put<TWarehouse>(`/${id}`, values );
    }

    changeStatus = async ( id: number, currentStatus: boolean ) =>{
        return this.put<TWarehouse>(`/${currentStatus ? "disable": "enable"}/${id}`);
    }
    
    search = async ( value: string ) =>{
        return this.get<TWarehouse[]>(`/search/${value}` );
    }

    paginate = async ( page: number, limit: number ) =>{
        return this.get<TPagination<TWarehouse>>(`/paginate?page=${page}&limit=${limit}` );
    }

    getById = async ( id: number ) =>{
        return this.get<TWarehouse | null>(`/${id}`);
    }

}

export const warehouseApi = new WarehouseApi();