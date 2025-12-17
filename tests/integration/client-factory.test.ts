import { createRAClient } from '../../src/client';
import { RAClient } from '../../src/client/RAClient';

describe('RAClient Factory', () => {
    it('should create a client instance with all services initialized', () => {
        const client = createRAClient({
            auth: { apiKey: 'test-key' },
        });

        expect(client).toBeInstanceOf(RAClient);

        // Verify all services are present
        expect(client.identity).toBeDefined();
        expect(client.identity.identities).toBeDefined();
        expect(client.identity.tokens).toBeDefined();

        expect(client.content).toBeDefined();
        expect(client.content.content).toBeDefined();
        expect(client.content.collections).toBeDefined();

        expect(client.storage).toBeDefined();
        expect(client.storage.buckets).toBeDefined();

        expect(client.payments).toBeDefined();
        expect(client.payments.subscriptions).toBeDefined();

        expect(client.feeds).toBeDefined();
        expect(client.feeds.feeds).toBeDefined();

        expect(client.revenue).toBeDefined();
        expect(client.revenue.campaigns).toBeDefined();

        expect(client.analytics).toBeDefined();
        expect(client.analytics.events).toBeDefined();
    });

    it('should allow setting access token', () => {
        const client = createRAClient({});
        // We can't easily verify the internal state without exposing it or mocking, 
        // but we can verify the method exists and doesn't throw.
        expect(() => client.setAccessToken('new-token')).not.toThrow();
    });
});
