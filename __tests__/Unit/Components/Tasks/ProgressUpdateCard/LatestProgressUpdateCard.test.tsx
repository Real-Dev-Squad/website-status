import moment from 'moment';
import { fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { mockGetTaskProgress } from '../../../../../__mocks__/db/progresses';
import LatestProgressUpdateCard from '@/components/taskDetails/ProgressUpdateCard/LatestProgressUpdateCard';

describe('LatestProgressUpdateCard Component', () => {
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

        //TODO : uncomment when remove dummyLongString
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

    it('should render the tooltip on hover on the date and should not render on mouse out off date', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const momentDate = moment(mockGetTaskProgress.data[2].date);
        const fullDate = momentDate.format('DD-MM-YY');
        const time = momentDate.format('hh:mmA');

        const tooltipString = `Updated at ${fullDate}, ${time}`;
        const dateElement = screen.getByTestId(
            'latest-progress-update-card-date'
        );

        fireEvent.mouseOver(dateElement);

        const tooltip = screen.getByTestId('tooltip');

        expect(tooltip).toBeInTheDocument();
        expect(tooltip.textContent).toBe(tooltipString);

        fireEvent.mouseOut(dateElement);

        expect(tooltip).not.toBeInTheDocument();
    });
});
