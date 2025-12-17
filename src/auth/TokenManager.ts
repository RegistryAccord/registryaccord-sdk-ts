export interface TokenStorage {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
}

export class InMemoryTokenStorage implements TokenStorage {
    private storage = new Map<string, string>();

    async get(key: string): Promise<string | null> {
        return this.storage.get(key) || null;
    }

    async set(key: string, value: string): Promise<void> {
        this.storage.set(key, value);
    }

    async remove(key: string): Promise<void> {
        this.storage.delete(key);
    }
}

export interface TokenManagerConfig {
    storage?: TokenStorage;
    refreshHandler?: (refreshToken: string) => Promise<{ accessToken: string; expiresIn: number }>;
}

export class TokenManager {
    private storage: TokenStorage;
    private refreshHandler?: (refreshToken: string) => Promise<{ accessToken: string; expiresIn: number }>;
    private accessToken: string | null = null;
    private refreshToken: string | null = null;

    constructor(config: TokenManagerConfig = {}) {
        this.storage = config.storage || new InMemoryTokenStorage();
        this.refreshHandler = config.refreshHandler;
    }

    async setTokens(tokens: { accessToken?: string; refreshToken?: string }) {
        if (tokens.accessToken) {
            this.accessToken = tokens.accessToken;
            await this.storage.set('access_token', tokens.accessToken);
        }
        if (tokens.refreshToken) {
            this.refreshToken = tokens.refreshToken;
            await this.storage.set('refresh_token', tokens.refreshToken);
        }
    }

    async getAccessToken(): Promise<string | null> {
        if (this.accessToken) return this.accessToken;
        this.accessToken = await this.storage.get('access_token');
        return this.accessToken;
    }

    async refreshAccessToken(): Promise<string | null> {
        if (!this.refreshHandler) {
            throw new Error('No refresh handler configured');
        }

        const refreshToken = this.refreshToken || (await this.storage.get('refresh_token'));
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const { accessToken } = await this.refreshHandler(refreshToken);
        await this.setTokens({ accessToken });
        return accessToken;
    }
}
