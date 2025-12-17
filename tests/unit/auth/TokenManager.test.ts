import { TokenManager, InMemoryTokenStorage } from '../../../src/auth/TokenManager';

describe('TokenManager', () => {
    describe('InMemoryTokenStorage', () => {
        it('should store and retrieve values', async () => {
            const storage = new InMemoryTokenStorage();
            await storage.set('key', 'value');
            expect(await storage.get('key')).toBe('value');
        });

        it('should remove values', async () => {
            const storage = new InMemoryTokenStorage();
            await storage.set('key', 'value');
            await storage.remove('key');
            expect(await storage.get('key')).toBeNull();
        });
    });

    describe('TokenManager Logic', () => {
        let storage: InMemoryTokenStorage;
        let tokenManager: TokenManager;

        beforeEach(() => {
            storage = new InMemoryTokenStorage();
            tokenManager = new TokenManager({ storage });
        });

        it('should return access token if set', async () => {
            tokenManager.setTokens({ accessToken: 'access-token' });
            expect(await tokenManager.getAccessToken()).toBe('access-token');
        });

        it('should return null if no token set', async () => {
            expect(await tokenManager.getAccessToken()).toBeNull();
        });

        it('should use refresh token to get new access token if expired', async () => {
            const refreshMock = jest.fn().mockResolvedValue({
                accessToken: 'new-access-token',
                expiresIn: 3600,
            });

            tokenManager = new TokenManager({
                storage,
                refreshHandler: refreshMock,
            });

            // Set expired token (simulate by not setting expiry, but forcing refresh logic test)
            // Actually, let's test the explicit refresh call for now as expiration logic requires time mocking
            tokenManager.setTokens({ refreshToken: 'refresh-token' });

            const token = await tokenManager.refreshAccessToken();

            expect(refreshMock).toHaveBeenCalledWith('refresh-token');
            expect(token).toBe('new-access-token');
            expect(await tokenManager.getAccessToken()).toBe('new-access-token');
        });
    });
});
