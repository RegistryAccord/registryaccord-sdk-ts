import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { createRetryHandler } from '../../../src/middleware/RetryHandler';

// Mock axios-retry or just test the configuration logic if we use a library
// Since we are implementing a custom interceptor or wrapper, let's test the logic.
// For this plan, we will implement a custom retry interceptor to have full control.

describe('RetryHandler', () => {
    it('should retry on 5xx errors', async () => {
        createRetryHandler({ maxRetries: 2, baseDelay: 10 });
        const config = { headers: new AxiosHeaders() } as InternalAxiosRequestConfig;

        // Mock the retry logic - this is tricky to unit test without mocking the entire axios instance
        // or the delay function.
        // Instead, we'll test the `shouldRetry` predicate if we expose it, or integration test it.
        // For unit testing the interceptor, we can check if it returns a promise that resolves
        // after retrying.

        // Let's assume we use a simple recursive retry mechanism attached to the interceptor.

        const mockAdapter = jest.fn()
            .mockRejectedValueOnce(new AxiosError('Server Error', '500', config, {}, { status: 500, statusText: 'Error', headers: {}, config, data: {} }))
            .mockResolvedValue({ status: 200, data: 'success' });

        const client = axios.create();
        client.defaults.adapter = mockAdapter;

        // Apply middleware
        const { onRejected } = createRetryHandler({ maxRetries: 1, baseDelay: 1 });
        client.interceptors.response.use(undefined, (error) => onRejected(error, client));

        const response = await client.request({ url: '/test' });

        expect(response.status).toBe(200);
        expect(mockAdapter).toHaveBeenCalledTimes(2);
    });

    it('should not retry on 4xx errors (except 429)', async () => {
        const config = { headers: new AxiosHeaders() } as InternalAxiosRequestConfig;
        const mockAdapter = jest.fn()
            .mockRejectedValue(new AxiosError('Not Found', '404', config, {}, { status: 404, statusText: 'Not Found', headers: {}, config, data: {} }));

        const client = axios.create();
        client.defaults.adapter = mockAdapter;

        const { onRejected } = createRetryHandler({ maxRetries: 1, baseDelay: 1 });
        client.interceptors.response.use(undefined, (error) => onRejected(error, client));

        await expect(client.request({ url: '/test' })).rejects.toThrow('Not Found');
        expect(mockAdapter).toHaveBeenCalledTimes(1);
    });
});
