import { AxiosError } from 'axios';

export interface ProblemDetails {
    type: string;
    title: string;
    status: number;
    detail?: string;
    instance?: string;
    correlationId?: string;
    retryAfter?: number;
    errors?: ValidationErrorDetail[];
    [key: string]: unknown;
}

export interface ValidationErrorDetail {
    field: string;
    message: string;
    code: string;
}

export class RAError extends Error {
    readonly type: string;
    readonly status: number;
    readonly title: string;
    readonly detail?: string;
    readonly instance?: string;
    readonly correlationId?: string;
    readonly retryAfter?: number;
    readonly raw: ProblemDetails;

    constructor(problem: ProblemDetails) {
        super(problem.title);
        this.name = this.constructor.name;
        this.type = problem.type;
        this.status = problem.status;
        this.title = problem.title;
        this.detail = problem.detail;
        this.instance = problem.instance;
        this.correlationId = problem.correlationId;
        this.retryAfter = problem.retryAfter;
        this.raw = problem;
    }
}

export class AuthenticationError extends RAError { }
export class AuthorizationError extends RAError { }
export class NotFoundError extends RAError { }
export class RateLimitError extends RAError { }
export class ValidationError extends RAError { }
export class ServerError extends RAError { }

export function parseError(error: unknown): RAError {
    if (error instanceof AxiosError) {
        const status = error.response?.status || 0;
        const data = error.response?.data;

        // Check if response is RFC 7807 compliant
        if (data && typeof data === 'object' && 'type' in data && 'title' in data) {
            return createTypedError(data as ProblemDetails, status);
        }

        // Handle non-standard errors
        const title = typeof data === 'string' ? data : error.message;
        return createTypedError(
            {
                type: 'about:blank',
                title,
                status,
                detail: error.message,
            },
            status
        );
    }

    // Fallback for unknown errors
    return new RAError({
        type: 'about:blank',
        title: error instanceof Error ? error.message : 'Unknown Error',
        status: 0,
    });
}

function createTypedError(problem: ProblemDetails, status: number): RAError {
    // Override status from problem details if it doesn't match HTTP status (trust HTTP status)
    const finalProblem = { ...problem, status };

    switch (status) {
        case 400:
        case 422:
            return new ValidationError(finalProblem);
        case 401:
            return new AuthenticationError(finalProblem);
        case 403:
            return new AuthorizationError(finalProblem);
        case 404:
            return new NotFoundError(finalProblem);
        case 429:
            return new RateLimitError(finalProblem);
    }

    if (status >= 500) {
        return new ServerError(finalProblem);
    }

    return new RAError(finalProblem);
}
