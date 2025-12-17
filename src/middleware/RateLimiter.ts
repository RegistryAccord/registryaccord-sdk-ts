import { AxiosError } from 'axios';
import { RateLimitError } from '../errors';

export function createRateLimitInterceptor() {
    return async (error: unknown) => {
        if (error instanceof AxiosError && error.response?.status === 429) {
            const retryAfterHeader = error.response.headers['retry-after'];
            const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : undefined;

            throw new RateLimitError({
                type: 'about:blank',
                title: 'Too Many Requests',
                status: 429,
                detail: 'Rate limit exceeded',
                retryAfter,
            });
        }
        throw error;
    };
}
