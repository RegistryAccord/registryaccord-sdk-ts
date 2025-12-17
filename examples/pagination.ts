import { createRAClient, CursorPaginator } from '../src';

async function main() {
    const client = createRAClient({
        auth: { apiKey: 'your-api-key' },
    });

    console.log('Fetching all identities with pagination...');

    // 1. Create a paginator
    // The fetcher function receives a cursor and returns a Promise<Page<T>>
    const paginator = new CursorPaginator(async (cursor) => {
        const response = await client.identity.identities.listIdentities(
            10, // limit
            cursor // cursor
        );

        // Adapt the response to the Page<T> interface expected by CursorPaginator
        return {
            items: response.data.items || [],
            nextCursor: response.data.next_cursor,
        };
    });

    // 2. Iterate over items across all pages
    try {
        let count = 0;
        for await (const identity of paginator.items()) {
            console.log(`#${++count}: ${identity.id}`);

            // Safety break for demo
            if (count >= 25) break;
        }
        console.log(`Processed ${count} items.`);
    } catch (error) {
        console.error('Pagination error:', error);
    }
}

if (require.main === module) {
    main();
}
