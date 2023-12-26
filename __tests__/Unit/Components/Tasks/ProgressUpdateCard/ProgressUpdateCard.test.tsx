import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { setupServer } from 'msw/node';
import handlers from '../../../../../__mocks__/handlers';
import { mockGetTaskProgress } from '../../../../../__mocks__/db/progresses';
import ProgressUpdateCard from '@/components/taskDetails/ProgressUpdateCard/ProgressUpdateCard';
import moment from 'moment';

const server = setupServer(...handlers);

beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'error',
    });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe.only('ProgressUpdateCard Component', () => {
    it('should render completed section string as title in card', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const cardTitle = screen.getByRole('heading');
        expect(cardTitle.textContent).toBe(
            mockGetTaskProgress.data[2].completed
        );
        console.log('cardTitle ', cardTitle);
    });

    it('should render date with ago format', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard data={mockGetTaskProgress.data[2]} />
            </Provider>
        );
        const dateInAgoFormat = moment(
            mockGetTaskProgress.data[2].date
        ).fromNow();
        const date = screen.getByTestId('progress-update-card-date');

        expect(date.textContent).toBe(dateInAgoFormat);
    });
});
