import { AxiosInstance, AxiosError } from 'axios';

export interface RetryConfig {
    maxRetries: number;
    baseDelay: number;
}

interface RetryState {
    __retryCount?: number;
}

export function createRetryHandler(config: RetryConfig) {
    return {
        onRejected: async (error: unknown, client: AxiosInstance) => {
            if (!isRetryable(error)) {
                throw error;
            }

            const axiosError = error as AxiosError;
            const configRaw = axiosError.config;
            if (!configRaw) {
                throw error;
            }

            const state = configRaw as RetryState;
            state.__retryCount = state.__retryCount || 0;

            if (state.__retryCount >= config.maxRetries) {
                throw error;
            }

            state.__retryCount += 1;
            const delay = Math.pow(2, state.__retryCount) * config.baseDelay; // Exponential backoff

            await new Promise((resolve) => setTimeout(resolve, delay));

            return client.request(configRaw);
        },
    };
}

function isRetryable(error: unknown): boolean {
    if (!(error instanceof AxiosError)) return false;

    // Network errors
    if (!error.response) return true;

    // 5xx Server Errors
    if (error.response.status >= 500 && error.response.status <= 599) return true;

    // 429 Too Many Requests (handled by RateLimiter usually, but good to have here if RateLimiter re-throws)
    if (error.response.status === 429) return true;

    return false;
}
