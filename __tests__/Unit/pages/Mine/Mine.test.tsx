import { waitFor } from '@testing-library/react';
import Mine from '@/pages/mine';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import {
    mineTasksErrorHandler,
    mineTasksNoDataFoundHandler,
} from '../../../../__mocks__/handlers/tasks.handler';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Mine Page', () => {
    it('should render loading state', () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );
        expect(getByText(/loading/i)).toBeInTheDocument();
    });

    it('should render no tasks found state', async () => {
        server.use(mineTasksNoDataFoundHandler);
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );
        await waitFor(() =>
            expect(getByText(/no tasks found/i)).toBeInTheDocument()
        );
    });

    it('should render mine tasks', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );
        await waitFor(() =>
            expect(
                getByText(
                    /Collapse non-interesting tasks or PRs in member details page/i
                )
            ).toBeInTheDocument()
        );
    });

    it('should render error state', async () => {
        server.use(mineTasksErrorHandler);
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );
        await waitFor(() =>
            expect(
                getByText(/Something went wrong! Please contact admin/i)
            ).toBeInTheDocument()
        );
    });

    it('should render not authorized state', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );
        await waitFor(() =>
            expect(getByText(/you are not authorized/i)).toBeInTheDocument()
        );
    });

    it('should render login link', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );
        await waitFor(() =>
            expect(getByText(/click here to login/i)).toBeInTheDocument()
        );
    });
});
