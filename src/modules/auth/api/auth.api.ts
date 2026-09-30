import { HttpClient } from "../../../shared/api/httpClient";
import type { TAuthUser, TLogin } from "../types/auth.type";

class AuthApi extends HttpClient {

    constructor(){
        super("/auth")
    }

    public login = async( data: TLogin ) =>{
        return await this.post<TAuthUser>("/login", data );
    }

    public refressSession = async ( data: { token: string } ) =>{
        return await this.post<TAuthUser>("/refress-session", data );
    }
}

export const authApi = new AuthApi();