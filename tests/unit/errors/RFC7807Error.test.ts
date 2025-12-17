import { AxiosError, AxiosHeaders } from 'axios';
import {
    RAError,
    AuthenticationError,
    AuthorizationError,
    NotFoundError,
    RateLimitError,
    ValidationError,
    ServerError,
    parseError,
    ProblemDetails,
} from '../../../src/errors';

describe('Error Handling', () => {
    describe('RAError', () => {
        it('should correctly map ProblemDetails properties', () => {
            const problem: ProblemDetails = {
                type: 'https://api.registryaccord.org/errors/not-found',
                title: 'Resource Not Found',
                status: 404,
                detail: 'The requested user was not found',
                instance: '/identity/users/123',
                correlationId: 'abc-123',
            };

            const error = new RAError(problem);

            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(RAError);
            expect(error.message).toBe('Resource Not Found');
            expect(error.type).toBe(problem.type);
            expect(error.status).toBe(404);
            expect(error.detail).toBe(problem.detail);
            expect(error.instance).toBe(problem.instance);
            expect(error.correlationId).toBe(problem.correlationId);
        });
    });

    describe('parseError', () => {
        const createAxiosError = (status: number, data: unknown): AxiosError => {
            const headers = new AxiosHeaders();
            const config = { headers: new AxiosHeaders() };
            return new AxiosError(
                'Request failed',
                'ERR_BAD_REQUEST',
                config,
                {},
                {
                    status,
                    statusText: 'Error',
                    data,
                    headers,
                    config,
                }
            );
        };

        it('should parse RFC 7807 compliant error', () => {
            const problem: ProblemDetails = {
                type: 'about:blank',
                title: 'Bad Request',
                status: 400,
                detail: 'Invalid input',
            };
            const axiosError = createAxiosError(400, problem);

            const error = parseError(axiosError);

            expect(error).toBeInstanceOf(ValidationError);
            expect(error.status).toBe(400);
            expect(error.title).toBe('Bad Request');
        });

        it('should parse 401 as AuthenticationError', () => {
            const axiosError = createAxiosError(401, { title: 'Unauthorized' });
            const error = parseError(axiosError);
            expect(error).toBeInstanceOf(AuthenticationError);
        });

        it('should parse 403 as AuthorizationError', () => {
            const axiosError = createAxiosError(403, { title: 'Forbidden' });
            const error = parseError(axiosError);
            expect(error).toBeInstanceOf(AuthorizationError);
        });

        it('should parse 404 as NotFoundError', () => {
            const axiosError = createAxiosError(404, { title: 'Not Found' });
            const error = parseError(axiosError);
            expect(error).toBeInstanceOf(NotFoundError);
        });

        it('should parse 429 as RateLimitError', () => {
            const axiosError = createAxiosError(429, { title: 'Too Many Requests' });
            const error = parseError(axiosError);
            expect(error).toBeInstanceOf(RateLimitError);
        });

        it('should parse 500 as ServerError', () => {
            const axiosError = createAxiosError(500, { title: 'Internal Server Error' });
            const error = parseError(axiosError);
            expect(error).toBeInstanceOf(ServerError);
        });

        it('should handle non-RFC7807 errors gracefully', () => {
            const axiosError = createAxiosError(502, 'Bad Gateway');
            const error = parseError(axiosError);

            expect(error).toBeInstanceOf(ServerError);
            expect(error.status).toBe(502);
            expect(error.title).toBe('Bad Gateway'); // Should use message or string body
        });

        it('should handle network errors (no response)', () => {
            const axiosError = new AxiosError('Network Error');
            const error = parseError(axiosError);

            expect(error).toBeInstanceOf(RAError);
            expect(error.status).toBe(0);
            expect(error.title).toBe('Network Error');
        });
    });
});
