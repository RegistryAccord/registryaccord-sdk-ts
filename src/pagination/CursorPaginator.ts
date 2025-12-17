export interface Page<T> {
    data: T[];
    pagination: {
        nextCursor?: string;
        hasNextPage: boolean;
    };
}

export class CursorPaginator<T> implements AsyncIterable<T[]> {
    constructor(private fetcher: (cursor?: string) => Promise<Page<T>>) { }

    async *[Symbol.asyncIterator](): AsyncIterator<T[]> {
        let cursor: string | undefined = undefined;
        let hasNextPage = true;

        while (hasNextPage) {
            const page = await this.fetcher(cursor);
            yield page.data;

            hasNextPage = page.pagination.hasNextPage;
            cursor = page.pagination.nextCursor;

            if (hasNextPage && !cursor) {
                // Safety check: if API says hasNextPage but provides no cursor, stop to prevent infinite loop
                break;
            }
        }
    }

    async *items(): AsyncIterableIterator<T> {
        for await (const page of this) {
            for (const item of page) {
                yield item;
            }
        }
    }

    async toArray(): Promise<T[]> {
        const results: T[] = [];
        for await (const page of this) {
            results.push(...page);
        }
        return results;
    }
}
