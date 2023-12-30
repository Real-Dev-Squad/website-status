import moment from 'moment';
import { fireEvent, getAllByTestId, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { mockGetTaskProgress } from '../../../../../__mocks__/db/progresses';
import LatestProgressUpdateCard from '@/components/taskDetails/ProgressUpdateCard/LatestProgressUpdateCard';
import { readMoreFormatter } from '@/utils/common';

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

        expect(completedString).toBe(mockGetTaskProgress.data[2].completed);
        expect(plannedString).toBe(mockGetTaskProgress.data[2].planned);
        expect(blockersString).toBe(mockGetTaskProgress.data[2].blockers);
        expect(date).toBeInTheDocument();
    });

    it('should render date with ago format', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[2]} />
            </Provider>
        );
        const dateInAgoFormat = moment(
            mockGetTaskProgress.data[2].createdAt
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

        const momentDate = moment(mockGetTaskProgress.data[2].createdAt);
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

    it('should not show readMoreButton if text is smaller than charactersToShow', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const moreOrLessButton = screen.queryAllByRole('button');
        moreOrLessButton.forEach((button) => {
            expect(button).not.toBeInTheDocument();
        });
    });

    it('should show the more or less button when text is greater than charactersToShow', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[3]} />
            </Provider>
        );

        const moreOrLessButton = screen.getAllByRole('button');

        moreOrLessButton.forEach((button) => {
            expect(button).toBeInTheDocument();
        });
        expect(moreOrLessButton.length).toBe(3);
    });

    it('should toggle the text between More and Less when more or less button is clicked', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[3]} />
            </Provider>
        );

        const moreOrLessButton = screen.getAllByRole('button')[0];

        expect(moreOrLessButton.textContent).toBe('More');

        fireEvent.click(moreOrLessButton);

        expect(moreOrLessButton.textContent).toBe('Less');
    });

    it('should show trimmed value in body of completed, planned and blockers if length is greater than charactersToShow', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[3]} />
            </Provider>
        );

        const charactersToShow = 70;
        const trimmedCompletedBody = readMoreFormatter(
            mockGetTaskProgress.data[3].completed,
            charactersToShow
        );
        const trimmedPlannedBody = readMoreFormatter(
            mockGetTaskProgress.data[3].planned,
            charactersToShow
        );
        const trimmedBlockersBody = readMoreFormatter(
            mockGetTaskProgress.data[3].blockers,
            charactersToShow
        );
        const trimmedBodyArray = [
            trimmedCompletedBody,
            trimmedPlannedBody,
            trimmedBlockersBody,
        ];
        const allProgressUpdatesBody = screen.getAllByTestId('info-body');

        allProgressUpdatesBody.forEach((updateBody, idx) => {
            expect(updateBody.textContent).toBe(trimmedBodyArray[idx] + 'More');
        });
    });

    it('should toggle the body from trimmed to full on click on more or less button', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[3]} />
            </Provider>
        );

        const charactersToShow = 70;
        const trimmedCompletedBody = readMoreFormatter(
            mockGetTaskProgress.data[3].completed,
            charactersToShow
        );
        const trimmedPlannedBody = readMoreFormatter(
            mockGetTaskProgress.data[3].planned,
            charactersToShow
        );
        const trimmedBlockersBody = readMoreFormatter(
            mockGetTaskProgress.data[3].blockers,
            charactersToShow
        );
        const trimmedBodyArray = [
            trimmedCompletedBody,
            trimmedPlannedBody,
            trimmedBlockersBody,
        ];

        const fullBody = [
            mockGetTaskProgress.data[3].completed,
            mockGetTaskProgress.data[3].planned,
            mockGetTaskProgress.data[3].blockers,
        ];
        const allProgressUpdatesBody = screen.getAllByTestId('info-body');
        const moreOrLessButton = screen.getAllByRole('button');

        allProgressUpdatesBody.forEach((updateBody, idx) => {
            expect(updateBody.textContent).toBe(trimmedBodyArray[idx] + 'More');
        });

        allProgressUpdatesBody.forEach((updateBody, idx) => {
            fireEvent.click(moreOrLessButton[idx]);

            expect(updateBody.textContent).toBe(fullBody[idx] + 'Less');
        });
    });
});
