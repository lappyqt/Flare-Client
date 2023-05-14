import ky, { KyResponse } from "ky";
import { KyInstance } from "ky/distribution/types/ky";
import { KyHeadersInit } from "ky/distribution/types/options";

export type HttpClientResponse<T> = T | KyResponse | Error | null;

export interface IHttpClient {
    get<T = unknown>(route: string): Promise<HttpClientResponse<T>>;
    post<T = unknown>(route: string, options: any): Promise<HttpClientResponse<T>>;
    put<T = unknown>(route: string, options: any): Promise<HttpClientResponse<T>>;
    patch<T = unknown>(route: string, options: any): Promise<HttpClientResponse<T>>;
    delete<T = unknown>(route: string, options: any): Promise<HttpClientResponse<T>>;
}

export class HttpClient implements IHttpClient {
    private kyInstance: KyInstance;

    constructor(prefixUrl: string | undefined = undefined, headers: KyHeadersInit | undefined = undefined) {
        this.kyInstance = ky.create(
        {
            prefixUrl: prefixUrl,
            headers: headers
        });
    }

    public async get<T = unknown>(route: string): Promise<HttpClientResponse<T>> {
        return await this.kyInstance.get(route).json();
    }

    public async post<T = unknown>(route: string, options: any): Promise<HttpClientResponse<T>> {
        return await this.kyInstance.post(route, options).json();
    }

    public async put<T = unknown>(route: string, options: any): Promise<HttpClientResponse<T>> {
        return await this.kyInstance.put(route, options).json();
    }

    public async patch<T = unknown>(route: string, options: any): Promise<HttpClientResponse<T>> {
        return await this.kyInstance.patch(route,  options).json();
    }

    public async delete<T = unknown>(route: string, options: any): Promise<HttpClientResponse<T>> {
        return await this.kyInstance.delete(route, options).json();
    }
}