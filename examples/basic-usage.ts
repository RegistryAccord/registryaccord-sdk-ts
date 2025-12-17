import { createRAClient, RAClientConfig } from '../src';

async function main() {
    // 1. Configure the client
    const config: RAClientConfig = {
        baseURL: 'https://api.registryaccord.org', // Optional, defaults to this
        auth: {
            apiKey: 'your-api-key',
        },
    };

    // 2. Initialize the client
    const client = createRAClient(config);

    try {
        // 3. Make an API call (e.g., list identities)
        console.log('Listing identities...');
        const response = await client.identity.identities.listIdentities();

        console.log('Identities found:', response.data.items?.length);
        response.data.items?.forEach((identity) => {
            console.log(`- ${identity.id}: ${identity.type}`);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

if (require.main === module) {
    main();
}
