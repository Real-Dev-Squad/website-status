import { render, fireEvent, screen } from '@testing-library/react';
import { updateQueryStringToUrl } from '@/utils/updateQueryStringToUrl';
import { NextRouter } from 'next/router';

// Mock Next.js router
const mockRouter: NextRouter = {
    push: jest.fn() as any,
    replace: jest.fn() as any,
    prefetch: jest.fn() as any,
    pathname: '',
    query: {},
    asPath: '',
    events: {
        on: jest.fn() as any,
        off: jest.fn() as any,
        emit: jest.fn() as any,
    },
    isFallback: false,
} as NextRouter;

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
