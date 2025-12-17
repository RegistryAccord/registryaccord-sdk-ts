import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import { createApiKeyInterceptor } from '../auth/ApiKeyAuth';
import { createVersionInterceptor } from '../middleware/VersionHeader';
import { createObservabilityInterceptor } from '../middleware/Observability';
import { createRateLimitInterceptor } from '../middleware/RateLimiter';
import { createRetryHandler } from '../middleware/RetryHandler';
import { parseError } from '../errors';

export interface AuthConfig {
    apiKey?: string;
    token?: string; // For future JWT support
}

export interface BaseClientConfig {
    baseURL?: string;
    timeout?: number;
    auth?: AuthConfig;
    retry?: boolean | { maxRetries: number; baseDelay: number };
    headers?: Record<string, string>;
}

export class BaseClient {
    public axiosInstance: AxiosInstance;

    constructor(config: BaseClientConfig) {
        const axiosConfig: CreateAxiosDefaults = {
            baseURL: config.baseURL || 'https://api.registryaccord.org',
            timeout: config.timeout || 10000,
            headers: config.headers,
        };

        this.axiosInstance = axios.create(axiosConfig);

        this.setupMiddleware(config);
    }

    private setupMiddleware(config: BaseClientConfig) {
        // 1. Request Middleware (Order matters: Auth -> Version -> Observability)

        // Auth
        if (config.auth?.apiKey) {
            this.axiosInstance.interceptors.request.use(
                createApiKeyInterceptor(config.auth.apiKey)
            );
        }

        // Version Header
        this.axiosInstance.interceptors.request.use(createVersionInterceptor());

        // Observability
        this.axiosInstance.interceptors.request.use(createObservabilityInterceptor());

        // 2. Response Middleware (Order matters: RateLimit -> Retry -> ErrorParsing)

        // Rate Limiting (Parse headers and throw RateLimitError)
        const rateLimiter = createRateLimitInterceptor();
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => rateLimiter(error)
        );

        // Retry Handler
        if (config.retry !== false) {
            const retryConfig = typeof config.retry === 'object' ? config.retry : { maxRetries: 3, baseDelay: 1000 };
            const retryHandler = createRetryHandler(retryConfig);
            this.axiosInstance.interceptors.response.use(
                (response) => response,
                (error) => retryHandler.onRejected(error, this.axiosInstance)
            );
        }

        // Error Parsing (Convert to RAError)
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                throw parseError(error);
            }
        );
    }
}
