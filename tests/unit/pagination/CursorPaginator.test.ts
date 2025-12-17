import { CursorPaginator, Page } from '../../../src/pagination/CursorPaginator';

describe('CursorPaginator', () => {
    const createMockFetcher = (pages: Record<string, Page<number>>) => {
        return jest.fn(async (cursor?: string): Promise<Page<number>> => {
            const key = cursor || 'initial';
            return pages[key] || { data: [], pagination: { hasNextPage: false } };
        });
    };

    it('should iterate over all items across multiple pages', async () => {
        const pages: Record<string, Page<number>> = {
            initial: {
                data: [1, 2],
                pagination: { hasNextPage: true, nextCursor: 'page2' },
            },
            page2: {
                data: [3, 4],
                pagination: { hasNextPage: true, nextCursor: 'page3' },
            },
            page3: {
                data: [5],
                pagination: { hasNextPage: false },
            },
        };

        const fetcher = createMockFetcher(pages);
        const paginator = new CursorPaginator(fetcher);
        const items: number[] = [];

        for await (const page of paginator) {
            items.push(...page);
        }

        expect(items).toEqual([1, 2, 3, 4, 5]);
        expect(fetcher).toHaveBeenCalledTimes(3);
        expect(fetcher).toHaveBeenCalledWith(undefined);
        expect(fetcher).toHaveBeenCalledWith('page2');
        expect(fetcher).toHaveBeenCalledWith('page3');
    });

    it('should return all items via toArray()', async () => {
        const pages: Record<string, Page<number>> = {
            initial: {
                data: [10, 20],
                pagination: { hasNextPage: true, nextCursor: 'next' },
            },
            next: {
                data: [30],
                pagination: { hasNextPage: false },
            },
        };

        const fetcher = createMockFetcher(pages);
        const paginator = new CursorPaginator(fetcher);

        const items = await paginator.toArray();

        expect(items).toEqual([10, 20, 30]);
    });

    it('should handle empty results', async () => {
        const pages: Record<string, Page<number>> = {
            initial: {
                data: [],
                pagination: { hasNextPage: false },
            },
        };

        const fetcher = createMockFetcher(pages);
        const paginator = new CursorPaginator(fetcher);

        const items = await paginator.toArray();

        expect(items).toEqual([]);
    });

    it('should support iterating item by item via items() generator', async () => {
        const pages: Record<string, Page<number>> = {
            initial: {
                data: [1, 2],
                pagination: { hasNextPage: true, nextCursor: 'p2' },
            },
            p2: {
                data: [3],
                pagination: { hasNextPage: false },
            },
        };

        const fetcher = createMockFetcher(pages);
        const paginator = new CursorPaginator(fetcher);
        const result: number[] = [];

        for await (const item of paginator.items()) {
            result.push(item);
        }

        expect(result).toEqual([1, 2, 3]);
    });
});
