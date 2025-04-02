import { waitFor, within } from '@testing-library/react';
import Mine, { searchTasks } from '@/pages/mine';
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
import * as taskQueryParams from '@/utils/taskQueryParams';
import * as getActiveTabModule from '@/utils/getActiveTab';
import * as getFilteredTasksModule from '@/utils/getFilteredTasks';
import task from '@/interfaces/task.type';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Mine Page', () => {
    it('should render loading state', () => {
        const { getByTestId } = renderWithRouter(
            <Provider store={store()}>
                <Mine />
            </Provider>,
            { route: '/mine' }
        );
        const container = getByTestId('mine-page-container');
        expect(within(container).getByText(/loading/i)).toBeInTheDocument();
    });

    it('should call searchTasks', () => {
        const setFilteredTasks = jest.fn();
        const setSelectedTab = jest.fn();
        const setTitle = jest.fn();
        const extractQueryParams = jest.spyOn(
            taskQueryParams,
            'extractQueryParams'
        );
        const getActiveTab = jest.spyOn(getActiveTabModule, 'getActiveTab');
        const getFilteredTasks = jest.spyOn(getFilteredTasksModule, 'default');
        const searchString = 'status:VERIFIED';
        const tasks: task[] = [];

        searchTasks(
            setFilteredTasks,
            setSelectedTab,
            setTitle,
            searchString,
            tasks
        );

        expect(extractQueryParams).toHaveBeenCalled();
        expect(getActiveTab).toHaveBeenCalled();
        expect(getFilteredTasks).toHaveBeenCalled();

        expect(setFilteredTasks).toHaveBeenCalled();
        expect(setSelectedTab).toHaveBeenCalled();
        expect(setTitle).toHaveBeenCalled();

        jest.restoreAllMocks();
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
            { route: '/mine' }
        );

        await waitFor(() =>
            expect(
                getAllByTestId(/task-shimmer-card/i).length
            ).toBeGreaterThanOrEqual(1)
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

    it('should render task cards', async () => {
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
        expect(searchInput).toBeInTheDocument();
        await userEvent.type(searchInput, 'status:verified');
        await waitFor(() => expect(searchInput).toHaveValue('status:verified'));
        await waitFor(() => findByText('status: verified'));

        const tag = await findByText('status: verified');
        expect(tag).toBeInTheDocument();

        userEvent.click(tag);

        await waitFor(() => expect(getAllByText('Verified').length).toEqual(2));
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
