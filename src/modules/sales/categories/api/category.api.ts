import { HttpClient } from "../../../../shared/api/httpClient";
import type { TPagination } from "../../../../shared/types/pagination.type";
import type { TCategory } from "../../types/category.type";

class CategoryApi extends HttpClient {

    constructor(){
        super("/categories");
    }

    create = async (values: TCategory ) =>{
        return this.post<TCategory>("/", values );
    };

    update = async ( id: number, values: TCategory ) =>{
        return this.put<TCategory>(`/${id}`, values );
    }

    changeStatus = async ( id: number, currentStatus: boolean ) =>{
        return this.put<TCategory>(`/${id}/${currentStatus ? "disable" : "enable"}`);
    }

    search = async ( value: string ) =>{
        return this.get<TCategory[]>(`/search/${value}`);
    }

    getById = async ( id: number ) =>{
        return this.get<TCategory>(`/${id}`);
    }

    paginate = async ( page: number, limit: number ) =>{
        return this.get<TPagination<TCategory>>(`/paginate?page=${page}&limit=${limit}`);
    }
}

export const categoryApi = new CategoryApi();