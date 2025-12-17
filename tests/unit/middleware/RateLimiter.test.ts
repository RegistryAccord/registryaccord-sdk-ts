import { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { createRateLimitInterceptor } from '../../../src/middleware/RateLimiter';
import { RateLimitError } from '../../../src/errors';

describe('RateLimiter', () => {
    it('should throw RateLimitError on 429 response', async () => {
        const interceptor = createRateLimitInterceptor();
        const error = new AxiosError(
            'Too Many Requests',
            'ERR_BAD_REQUEST',
            undefined,
            undefined,
            {
                status: 429,
                statusText: 'Too Many Requests',
                headers: new AxiosHeaders({
                    'retry-after': '60',
                    'x-ratelimit-limit': '100',
                    'x-ratelimit-remaining': '0',
                    'x-ratelimit-reset': '1234567890',
                }),
                config: { headers: new AxiosHeaders() } as InternalAxiosRequestConfig,
                data: {},
            }
        );

        try {
            await interceptor(error);
            fail('Should have thrown RateLimitError');
        } catch (e) {
            expect(e).toBeInstanceOf(RateLimitError);
            const rateLimitError = e as RateLimitError;
            expect(rateLimitError.status).toBe(429);
            expect(rateLimitError.retryAfter).toBe(60);
        }
    });

    it('should pass through non-429 errors', async () => {
        const interceptor = createRateLimitInterceptor();
        const error = new AxiosError('Not Found', 'ERR_BAD_REQUEST', undefined, undefined, {
            status: 404,
            statusText: 'Not Found',
            headers: new AxiosHeaders(),
            config: { headers: new AxiosHeaders() } as InternalAxiosRequestConfig,
            data: {},
        });

        try {
            await interceptor(error);
            fail('Should have re-thrown original error');
        } catch (e) {
            expect(e).toBe(error);
        }
    });
});
