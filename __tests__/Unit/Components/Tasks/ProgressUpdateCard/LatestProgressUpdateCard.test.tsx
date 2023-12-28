import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { mockGetTaskProgress } from '../../../../../__mocks__/db/progresses';
import LatestProgressUpdateCard from '@/components/taskDetails/ProgressUpdateCard/LatestProgressUpdateCard';
import moment from 'moment';

describe.only('LatestProgressUpdateCard Component', () => {
    it('should render the component with the passed data', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const completedString =
            screen.getByText('Completed:').nextSibling.textContent;
        const plannedString =
            screen.getByText('Planned:').nextSibling.textContent;
        const blockersString =
            screen.getByText('Blockers:').nextSibling.textContent;

        const date = screen.getByTestId('latest-progress-update-card-date');

        // expect(completedString).toBe(mockGetTaskProgress.data[2].completed);
        // expect(plannedString).toBe(mockGetTaskProgress.data[2].planned);
        // expect(blockersString).toBe(mockGetTaskProgress.data[2].blockers);
        expect(date).toBeInTheDocument();
    });

    it('should render date with ago format', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[2]} />
            </Provider>
        );
        const dateInAgoFormat = moment(
            mockGetTaskProgress.data[2].date
        ).fromNow();
        const date = screen.getByTestId('latest-progress-update-card-date');

        expect(date.textContent).toBe(dateInAgoFormat);
    });
});
