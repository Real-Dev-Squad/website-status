import { store } from '@/app/store';
import ProgressCard from '@/components/ProgressCard';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { fireEvent, screen } from '@testing-library/react';
import moment from 'moment';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { mockGetTaskProgress } from '../../../../__mocks__/db/progresses';
import handlers from '../../../../__mocks__/handlers';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'error',
    });
});

const dateInAgoFormatOne = moment(
    mockGetTaskProgress.data[0].createdAt
).fromNow();
const dateInAgoFormatTwo = moment(
    mockGetTaskProgress.data[1].createdAt
).fromNow();
const dateInAgoFormatThree = moment(
    mockGetTaskProgress.data[2].createdAt
).fromNow();

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProgressCard Component', () => {
    it('should render the ProgressCard', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );
        const progress = screen.getByTestId('progressCard');
        expect(progress).toBeInTheDocument();
        expect(progress).toHaveTextContent('Progress Updates');
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
        const progressArr = container.querySelectorAll(
            '[data-testid="progress-update-card-date"]'
        );

        expect(progressArr[0]).toHaveTextContent(dateInAgoFormatOne);
        expect(progressArr[1]).toHaveTextContent(dateInAgoFormatTwo);
        expect(progressArr[2]).toHaveTextContent(dateInAgoFormatThree);
    });
    it('should render the progress enteries in dscending order after Dsc btn click  ', async () => {
        const { container, getByRole } = renderWithRouter(
            <Provider store={store()}>
                <ProgressCard taskProgress={mockGetTaskProgress.data} />
            </Provider>
        );

        const btn = getByRole('button', { name: 'Dsc' });
        fireEvent.click(btn);
        const progressArr = container.querySelectorAll(
            '[data-testid="progress-update-card-date"]'
        );
        expect(progressArr[progressArr.length - 1]).toHaveTextContent(
            dateInAgoFormatOne
        );
        expect(progressArr[progressArr.length - 2]).toHaveTextContent(
            dateInAgoFormatTwo
        );
        expect(progressArr[progressArr.length - 3]).toHaveTextContent(
            dateInAgoFormatThree
        );
    });
});
