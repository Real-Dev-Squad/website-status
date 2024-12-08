import moment from 'moment';
import { fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { mockGetTaskProgress } from '../../../../../__mocks__/db/progresses';
import LatestProgressUpdateCard from '@/components/taskDetails/ProgressUpdateCard/LatestProgressUpdateCard';
import { readMoreFormatter } from '@/utils/common';
import { DEFAULT_AVATAR, USER_MANAGEMENT_URL } from '@/constants/url';
import { useRouter } from 'next/router';
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('LatestProgressUpdateCard Component', () => {
    it('should render the default avatar and username when userData is undefined', () => {
        const mockRouter = {
            query: { dev: 'true' },
        };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        const mockDataWithNoUserData = {
            ...mockGetTaskProgress.data[2],
            userData: undefined,
        };

        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockDataWithNoUserData} />
            </Provider>
        );
        const usernameLink = screen.getByRole('link', { name: 'Avatar' });
        expect(usernameLink).toHaveAttribute(
            'href',
            `${USER_MANAGEMENT_URL}?username=`
        );

        const profilePicture = screen.getByTestId(
            'latest-progress-update-card-profile-picture'
        );
        expect(profilePicture).toHaveAttribute('src', DEFAULT_AVATAR);
    });

    it('should render the component with the passed data', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const completedSection = screen.getByText('Completed:').nextSibling;
        const plannedSection = screen.getByText('Planned:').nextSibling;
        const blockersSection = screen.getByText('Blockers:').nextSibling;

        const date = screen.getByTestId('latest-progress-update-card-date');

        expect(completedSection).toHaveTextContent(
            mockGetTaskProgress.data[2].completed
        );
        expect(plannedSection).toHaveTextContent(
            mockGetTaskProgress.data[2].planned
        );
        expect(blockersSection).toHaveTextContent(
            mockGetTaskProgress.data[2].blockers
        );
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

        expect(date).toHaveTextContent(dateInAgoFormat);
    });
    it('should render the tooltip on hover on the date and should not render on mouse out of date', () => {
        renderWithRouter(
            <Provider store={store()}>
                <LatestProgressUpdateCard data={mockGetTaskProgress.data[2]} />
            </Provider>
        );

        const dateElement = screen.getByTestId(
            'latest-progress-update-card-date'
        );

        fireEvent.mouseOver(dateElement);

        const momentDate = moment(mockGetTaskProgress.data[2].createdAt);
        const fullDate = momentDate.format(
            'dddd, MMMM DD, YYYY, hh:mm A [GMT] Z'
        );
        const tooltipString = `Updated at ${fullDate}`;

        const tooltip = screen.getByText(tooltipString);
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveClass('fade-in');

        fireEvent.mouseOut(dateElement);

        expect(tooltip).toHaveClass('fade-out');
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

        expect(moreOrLessButton).toHaveTextContent('More');

        fireEvent.click(moreOrLessButton);

        expect(moreOrLessButton).toHaveTextContent('Less');
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
            expect(updateBody).toHaveTextContent(
                trimmedBodyArray[idx] + 'More'
            );
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
            expect(updateBody).toHaveTextContent(
                trimmedBodyArray[idx] + 'More'
            );
        });

        allProgressUpdatesBody.forEach((updateBody, idx) => {
            fireEvent.click(moreOrLessButton[idx]);

            expect(updateBody).toHaveTextContent(fullBody[idx] + 'Less');
        });
    });
});
