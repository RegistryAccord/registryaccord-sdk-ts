import { InternalAxiosRequestConfig } from 'axios';

export const VERSION_HEADER = 'RA-API-Version';
export const DEFAULT_API_VERSION = '2025-11-01';

export function createVersionInterceptor(version: string = DEFAULT_API_VERSION) {
    return (config: InternalAxiosRequestConfig) => {
        config.headers.set(VERSION_HEADER, version);
        return config;
    };
}
