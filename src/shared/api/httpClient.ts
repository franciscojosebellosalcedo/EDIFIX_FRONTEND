import type {
    AxiosInstance,
    AxiosRequestConfig,
} from 'axios';

import axios from 'axios';

import { store } from '../../store';
import type { TResponse } from '../responsehttp/response.http';

export class HttpClient {

    private api: AxiosInstance;

    private baseURL: string = import.meta.env.VITE_APP_API_URL

    constructor(
        path: string
    ) {        
        
        this.api = axios.create({
            baseURL: `${this.baseURL}${path}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    private getToken() {
        return store.getState().auth.accessToken;
    }

    protected get = async <T>(
        url: string,
        config?: AxiosRequestConfig
    ) => {
        const response = await this.api.get<TResponse<T>>(
            url,
            {
                ...config,
                headers: {
                    ...config?.headers,
                    Authorization: `Bearer ${this.getToken()}`,
                },
            }
        );

        return response.data;
    };

    protected post = async <T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ) => {
        const response = await this.api.post<TResponse<T>>(
            url,
            data,
            {
                ...config,
                headers: {
                    ...config?.headers,
                    Authorization: `Bearer ${this.getToken()}`,
                },
            }
        );

        return response.data;
    };

    protected put = async <T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ) => {
        const response = await this.api.put<TResponse<T>>(
            url,
            data,
            {
                ...config,
                headers: {
                    ...config?.headers,
                    Authorization: `Bearer ${this.getToken()}`,
                },
            }
        );

        return response.data;
    };

    protected delete = async <T>(
        url: string,
        config?: AxiosRequestConfig
    ) => {
        const response = await this.api.delete<TResponse<T>>(
            url,
            {
                ...config,
                headers: {
                    ...config?.headers,
                    Authorization: `Bearer ${this.getToken()}`,
                },
            }
        );

        response.data;
    };
}