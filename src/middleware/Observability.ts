import { InternalAxiosRequestConfig } from 'axios';

export interface TraceContext {
    traceId: string;      // 32 hex chars
    spanId: string;       // 16 hex chars
    traceFlags: string;   // 2 hex chars (usually "01")
    correlationId: string; // UUID v4
}

function generateHex(length: number): string {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * 16)];
    }
    return result;
}

function uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function generateTraceContext(): TraceContext {
    return {
        traceId: generateHex(32),
        spanId: generateHex(16),
        traceFlags: '01',
        correlationId: uuidv4(),
    };
}

export function formatTraceparent(ctx: TraceContext): string {
    return `00-${ctx.traceId}-${ctx.spanId}-${ctx.traceFlags}`;
}

export function createObservabilityInterceptor() {
    return (config: InternalAxiosRequestConfig) => {
        const ctx = generateTraceContext();
        config.headers.set('traceparent', formatTraceparent(ctx));
        config.headers.set('tracestate', ''); // Optional, empty for now
        config.headers.set('X-Correlation-Id', ctx.correlationId);
        return config;
    };
}
