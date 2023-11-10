import { render, fireEvent, screen } from '@testing-library/react';
import { updateQueryStringToUrl } from '@/utils/updateQueryStringToUrl';
import { NextRouter } from 'next/router';

// Mock Next.js router
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

describe('updateQueryString', () => {
    it('should update the search query to url', async () => {
        updateQueryStringToUrl(mockRouter, {
            text: 'dark mode',
        });

        expect(mockRouter.push).toHaveBeenCalledWith({
            query: expect.objectContaining({
                q: 'search:dark mode',
            }),
        });
    });
});
