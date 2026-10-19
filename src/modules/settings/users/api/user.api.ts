import { HttpClient } from "../../../../shared/api/httpClient";
import type { TPagination } from "../../../../shared/types/pagination.type";
import type { TDataUser, TUser } from "../../types/user.type";

export class UserApi extends HttpClient {

    constructor() {
        super("/users")
    }

    create = async ( values: TDataUser ) =>{
        return this.post<TDataUser>("/", values );
    };

    update = async ( id: number , values: TDataUser ) =>{
        return this.put<TDataUser>(`/${id}`, values );
    };

    getUserById = async ( id: number ) =>{
        return this.get<TDataUser>(`/${id}`);
    };

    getOnlyUserById = async ( id: number ) =>{
        return this.get<TUser>(`/${id}/only-user`);
    };

    paginate = async (page: number, limit: number) => {
        return this.get<TPagination<TUser>>(`/paginate?page=${page}&limit=${limit}`);
    };

    search = async (value: string) => {
        return this.get<TUser[]>(`/search?name=${value}`);
    };

    changeStatus = async (id: number, currentStatus: boolean) => {
        return this.put<TUser>(`/${id}/${currentStatus ? "disable" : "enable"}`);
    }

};

export const userApi = new UserApi();
