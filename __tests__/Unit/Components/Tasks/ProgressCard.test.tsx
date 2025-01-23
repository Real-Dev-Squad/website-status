import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import moment from 'moment';
import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import { mockGetTaskProgress } from '../../../../__mocks__/db/progresses';
import ProgressCard from '@/components/ProgressCard';
import { useRouter } from 'next/router';
const server = setupServer(...handlers);

const dateMay29 = moment(mockGetTaskProgress.data[0].createdAt).fromNow();
const dateMay27 = moment(mockGetTaskProgress.data[1].createdAt).fromNow();
const dateMay31_122002 = moment(
    mockGetTaskProgress.data[2].createdAt
).fromNow();
const dateMay31_122006 = moment(
    mockGetTaskProgress.data[3].createdAt
).fromNow();

beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'error',
    });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('@/hooks/useIntersection', () => {
    return jest.fn().mockImplementation(() => ({
        loadingRef: { current: {} },
        onLoadMore: jest.fn(),
    }));
});

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('ProgressCard Component', () => {
    const mockFetchMoreProgresses = jest.fn();

    it('should render the ProgressCard', async () => {
        const mockRouter = {
            query: { dev: 'false' },
        };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        renderWithRouter(
            <Provider store={store()}>
                <ProgressCard
                    taskProgress={mockGetTaskProgress.data}
                    fetchMoreProgresses={mockFetchMoreProgresses}
                    isFetchingProgress={false}
                    devFlag={false}
                />
            </Provider>
        );
        const progress = screen.getByTestId('progressCard');
        expect(progress).toBeInTheDocument();
        expect(progress).toHaveTextContent('Progress Updates');
    });

    it('should show loading ref only when devFlag is true', () => {
        const mockRouter = {
            query: { dev: 'true' },
        };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        const { rerender } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard
                    taskProgress={mockGetTaskProgress.data}
                    fetchMoreProgresses={mockFetchMoreProgresses}
                    isFetchingProgress={false}
                    devFlag={false}
                />
            </Provider>
        );

        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

        rerender(
            <Provider store={store()}>
                <ProgressCard
                    taskProgress={mockGetTaskProgress.data}
                    fetchMoreProgresses={mockFetchMoreProgresses}
                    isFetchingProgress={true}
                    devFlag={true}
                />
            </Provider>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render Asc/Dsc button  ', async () => {
        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );

        expect(getByRole('button', { name: 'Dsc' })).toBeInTheDocument();
    });
    it('should change the text on click of Asc/Dsc button from dsc to asc  ', async () => {
        const { getByRole } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );
        const btn = getByRole('button', { name: 'Dsc' });
        fireEvent.click(btn);
        expect(getByRole('button', { name: 'Asc' })).toBeInTheDocument();
    });
    it('should render the progress enteries in ascending order  ', async () => {
        const { container } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );
        const latestUpdateDate = container.querySelector(
            '[data-testid="latest-progress-update-card-date"]'
        );
        const progressArr = container.querySelectorAll(
            '[data-testid="progress-update-card-date"]'
        );

        expect(latestUpdateDate).toHaveTextContent(dateMay31_122006);
        expect(progressArr[0]).toHaveTextContent(dateMay31_122002);
        expect(progressArr[1]).toHaveTextContent(dateMay29);
        expect(progressArr[2]).toHaveTextContent(dateMay27);
    });
    it('should render the progress enteries in dscending order after Dsc btn click  ', async () => {
        const { container, getByRole } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );

        const btn = getByRole('button', { name: 'Dsc' });
        fireEvent.click(btn);
        const latestUpdateDate = container.querySelector(
            '[data-testid="latest-progress-update-card-date"]'
        );
        const progressArr = container.querySelectorAll(
            '[data-testid="progress-update-card-date"]'
        );

        expect(progressArr[0]).toHaveTextContent(dateMay27);
        expect(progressArr[1]).toHaveTextContent(dateMay29);
        expect(progressArr[2]).toHaveTextContent(dateMay31_122002);
        expect(latestUpdateDate).toHaveTextContent(dateMay31_122006);
    });
});
