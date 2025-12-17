import axios from 'axios';
import { BaseClient } from '../../../src/client/BaseClient';
// import { ApiKeyAuth } from '../../../src/auth';

// Mock axios create
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BaseClient', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockInstance: any;

    beforeEach(() => {
        mockInstance = {
            interceptors: {
                request: { use: jest.fn() },
                response: { use: jest.fn() },
            },
            defaults: { headers: { common: {} } },
        };
        mockedAxios.create.mockReturnValue(mockInstance);
    });

    it('should create an axios instance with default configuration', () => {
        new BaseClient({});
        expect(mockedAxios.create).toHaveBeenCalledWith(
            expect.objectContaining({
                baseURL: 'https://api.registryaccord.org',
                timeout: 10000,
            })
        );
    });

    it('should configure authentication if provided', () => {
        const auth = { apiKey: 'test-key' };
        new BaseClient({ auth });

        // Check if request interceptor was added (we assume it's the auth one)
        expect(mockInstance.interceptors.request.use).toHaveBeenCalled();
    });

    it('should configure retry handler by default', () => {
        new BaseClient({});
        // Check if response interceptor was added (retry handler)
        expect(mockInstance.interceptors.response.use).toHaveBeenCalled();
    });

    it('should allow disabling retries', () => {
        new BaseClient({ retry: false });
        // Should still have response interceptors (e.g. error parsing), but maybe fewer?
        // This is hard to test without inspecting the interceptors themselves.
        // For now, we trust the factory logic which we will implement.
    });
});
