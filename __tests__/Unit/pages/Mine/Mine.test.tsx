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

    it('should render filter dropdown', async () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );

        await waitFor(() => expect(getByText(/Filter/i)).toBeInTheDocument());
    });

    it('should render search input', async () => {
        const { getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );

        await waitFor(() =>
            expect(getByTestId(/pill-input-wrapper/i)).toBeInTheDocument()
        );
    });

    it('should render mine tasks', async () => {
        const { getAllByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );

        await waitFor(() =>
            expect(getAllByTestId(/task-card/i).length).toBeGreaterThanOrEqual(
                1
            )
        );
    });

    it('should filter tasks based on search input', async () => {
        const { findByText, getAllByText, findByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );

        const searchInput = await findByTestId('search-input');
        userEvent.type(searchInput, 'status:verified');
        const tag = await findByText('status: verified');
        userEvent.click(tag);

        await waitFor(() => {
            expect(getAllByText('Verified').length).toEqual(2);
        });
    });

    it('should filter tasks based on filter dropdown select', async () => {
        const { findByText, getAllByText } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
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
