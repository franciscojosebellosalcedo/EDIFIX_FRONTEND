import { isAxiosError } from "axios";
import type { TResponse } from "../responsehttp/response.http";

export const getCodeError = ( error: unknown ) =>{

    if( isAxiosError<TResponse<unknown>>(error)){
        return error.response?.data.code;
    }
}

export const haveErrorForm = ( errors: Record<string, string>) =>{

    const keys = Object.keys( errors );
    return keys.length > 0;
    
}