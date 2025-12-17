import { InternalAxiosRequestConfig } from 'axios';

export interface ApiKeyAuthConfig {
    headerName?: string;
    prefix?: string;
}

export function createApiKeyInterceptor(apiKey: string, config: ApiKeyAuthConfig = {}) {
    const headerName = config.headerName || 'Authorization';
    const prefix = config.prefix !== undefined ? config.prefix : 'Bearer';

    return (reqConfig: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const value = prefix ? `${prefix} ${apiKey}` : apiKey;
        reqConfig.headers.set(headerName, value);
        return reqConfig;
    };
}
