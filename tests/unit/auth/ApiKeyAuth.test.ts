import { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { createApiKeyInterceptor } from '../../../src/auth/ApiKeyAuth';

describe('ApiKeyAuth', () => {
    it('should inject Authorization header with Bearer prefix by default', () => {
        const interceptor = createApiKeyInterceptor('test-api-key');
        const config = { headers: new AxiosHeaders() } as InternalAxiosRequestConfig;

        const result = interceptor(config);

        expect(result.headers.get('Authorization')).toBe('Bearer test-api-key');
    });

    it('should support custom header name', () => {
        const interceptor = createApiKeyInterceptor('test-api-key', { headerName: 'X-API-Key' });
        const config = { headers: new AxiosHeaders() } as InternalAxiosRequestConfig;

        const result = interceptor(config);

        expect(result.headers.get('X-API-Key')).toBe('Bearer test-api-key');
    });

    it('should support custom prefix', () => {
        const interceptor = createApiKeyInterceptor('test-api-key', { prefix: 'ApiKey' });
        const config = { headers: new AxiosHeaders() } as InternalAxiosRequestConfig;

        const result = interceptor(config);

        expect(result.headers.get('Authorization')).toBe('ApiKey test-api-key');
    });

    it('should support empty prefix', () => {
        const interceptor = createApiKeyInterceptor('test-api-key', { prefix: '' });
        const config = { headers: new AxiosHeaders() } as InternalAxiosRequestConfig;

        const result = interceptor(config);

        expect(result.headers.get('Authorization')).toBe('test-api-key');
    });
});
