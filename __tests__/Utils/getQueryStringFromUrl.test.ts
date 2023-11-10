import { NextRouter } from 'next/router';

import { getQueryStringFromUrl } from '@/utils/getQueryStringFromUrl';

describe('getQueryString', () => {
    const mockRouter: NextRouter = {
        route: '/issues',
        pathname: '/issues',
        query: {
            q: 'search:dark mode',
        },
        asPath: '/issues?dev=true&q=search%3Adark+mode',
        basePath: '',
        isLocaleDomain: false,
        push: jest.fn(),
        replace: jest.fn(),
        reload: jest.fn(),
        back: jest.fn(),
        forward: jest.fn(),
        prefetch: jest.fn(),
        beforePopState: jest.fn(),
        events: {
            on: jest.fn(),
            off: jest.fn(),
            emit: jest.fn(),
        },
        isFallback: false,
        isReady: true,
        isPreview: false,
    };

    it('should get the query string from the url', () => {
        const result = getQueryStringFromUrl(mockRouter);
        expect(typeof result).toBe('string');
        expect(result).toBe('dark mode');
    });
});
