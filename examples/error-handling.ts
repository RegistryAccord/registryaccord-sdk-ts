import { createRAClient, RAError, RateLimitError } from '../src';

async function main() {
    const client = createRAClient({
        auth: { apiKey: 'invalid-key' }, // Intentionally invalid to trigger error
    });

    try {
        console.log('Attempting API call...');
        await client.identity.identities.getIdentity('non-existent-id');
    } catch (error) {
        if (error instanceof RAError) {
            console.error('Caught RAError:');
            console.error(`- Status: ${error.status}`);
            console.error(`- Code: ${error.code}`);
            console.error(`- Message: ${error.message}`);
            console.error(`- Request ID: ${error.requestId}`);

            if (error instanceof RateLimitError) {
                console.error(`- Retry After: ${error.retryAfter}ms`);
            }
        } else {
            console.error('Unknown error:', error);
        }
    }
}

if (require.main === module) {
    main();
}
