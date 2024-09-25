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
import userEvent from '@testing-library/user-event';

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

    it('should render shimmer cards', async () => {
        const { getAllByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine', query: { dev: 'true' } }
        );

        await waitFor(() =>
            expect(
                getAllByTestId(/shimmer-card/i).length
            ).toBeGreaterThanOrEqual(1)
        );
    });

    it('should render old UI component for mine tasks when dev is disabled', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine', query: { dev: 'false' } }
        );
        await waitFor(() =>
            expect(
                getByText(
                    /Collapse non-interesting tasks or PRs in member details page/i
                )
            ).toBeInTheDocument()
        );
    });

    it('should render filter dropdown when dev is enabled', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine', query: { dev: 'true' } }
        );

        await waitFor(() => expect(getByText(/Filter/i)).toBeInTheDocument());
    });

    it('should render search input when dev is enabled', async () => {
        const { getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine', query: { dev: 'true' } }
        );

        await waitFor(() =>
            expect(getByTestId(/pill-input-wrapper/i)).toBeInTheDocument()
        );
    });

    it('should render new UI component for mine tasks when dev is enabled', async () => {
        const { getAllByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine', query: { dev: 'true' } }
        );

        await waitFor(() =>
            expect(getAllByTestId(/task-card/i).length).toBeGreaterThanOrEqual(
                1
            )
        );
    });

    it('should filter tasks based on search input when dev is enabled', async () => {
        const { findByText, getAllByText, findByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine', query: { dev: 'true' } }
        );

        const searchInput = await findByTestId('search-input');
        userEvent.type(searchInput, 'status:verified');
        const tag = await findByText('status: verified');
        userEvent.click(tag);

        await waitFor(() => {
            expect(getAllByText('Verified').length).toEqual(2);
        });
    });

    it('should filter tasks based on filter dropdown select when dev is enabled', async () => {
        const { findByText, getAllByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine', query: { dev: 'true' } }
        );

        const dropdown = await findByText('Filter');
        userEvent.click(dropdown);
        const tab = await findByText('IN PROGRESS');
        userEvent.click(tab);

        await waitFor(() => {
            expect(getAllByText('In Progress', { exact: true }).length).toEqual(
                1
            );
        });
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
