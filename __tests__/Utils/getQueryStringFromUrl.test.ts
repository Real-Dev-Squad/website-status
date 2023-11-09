import { NextRouter } from 'next/router';

import { getQueryStringFromUrl } from '@/utils/getQueryStringFromUrl';

describe('getQueryString', () => {
    const mockRouter: NextRouter = {
        route: '/',
        pathname: '/',
        query: {
            q: 'search:dark mode',
        },
        asPath: '/',
        basePath: '/',
        isLocaleDomain: false,
        push: jest.fn(), // Mock the push method with a basic implementation
        replace: jest.fn(), // Mock the replace method with a basic implementation
        reload: jest.fn(), // Mock the reload method
        back: jest.fn(), // Mock the back method
        forward: jest.fn(), // Mock the forward method
        prefetch: jest.fn(), // Mock the prefetch method with a basic implementation
        beforePopState: jest.fn(), // Mock the beforePopState method
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
