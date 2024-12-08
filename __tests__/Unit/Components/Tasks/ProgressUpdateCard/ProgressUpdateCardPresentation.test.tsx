import moment from 'moment';
import { MouseEvent } from 'react';
import { Provider } from 'react-redux';
import { fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { mockGetTaskProgress } from '../../../../../__mocks__/db/progresses';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { readMoreFormatter } from '@/utils/common';
import { store } from '@/app/store';

import {
    ProgressUpdateCardPresentationProps,
    ProgressUpdateDataToShow,
} from '@/components/taskDetails/ProgressUpdateCard/progressUpdateCard.types';

import ProgressUpdateCardPresentation from '@/components/taskDetails/ProgressUpdateCard/ProgressUpdateCardPresentation';

let initialProps: ProgressUpdateCardPresentationProps;
const titleToShow = mockGetTaskProgress.data[1].completed;
const momentDate = moment(mockGetTaskProgress.data[2].createdAt);
const username = 'mock-user-name';
const userProfileImageUrl =
    'https://res.cloudinary.com/realdevsquad/image/upload/v1661061375/profile/xpHe38L/ogirm51v.jpg';
const fullDate = momentDate.format('DD-MM-YY');
const time = momentDate.format('hh:mmA');
const tooltipString = `Updated at ${fullDate}, ${time}`;
const dateInAgoFormat = moment(
    mockGetTaskProgress.data[1]?.createdAt
).fromNow();
let mockedOnMoreOrLessButtonClick: jest.Mock<
    void,
    [React.MouseEvent<HTMLElement>]
>;
let mockedOnCardClick: jest.Mock<void, [MouseEvent<HTMLElement>]>;
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
const charactersToShow = 70;
const dataToShowState = [
    {
        id: `completed-${mockGetTaskProgress.data[1].id}`,
        label: 'Completed:',
        body: mockGetTaskProgress.data[1].completed,
        trimmedBody: readMoreFormatter(
            mockGetTaskProgress.data[1].completed,
            charactersToShow
        ),
        shouldReadMoreButtonShow:
            mockGetTaskProgress.data[1].completed.length > charactersToShow,
        isReadMoreEnabled: false,
    },
    {
        id: `planned-${mockGetTaskProgress.data[1].id}`,
        label: 'Planned:',
        body: mockGetTaskProgress.data[1].planned,
        trimmedBody: readMoreFormatter(
            mockGetTaskProgress.data[1].planned,
            charactersToShow
        ),
        shouldReadMoreButtonShow:
            mockGetTaskProgress.data[1].planned.length > charactersToShow,
        isReadMoreEnabled: false,
    },
    {
        id: `blockers-${mockGetTaskProgress.data[1].id}`,
        label: 'Blockers:',
        body: mockGetTaskProgress.data[1].blockers,
        trimmedBody: readMoreFormatter(
            mockGetTaskProgress.data[1].blockers,
            charactersToShow
        ),
        shouldReadMoreButtonShow:
            mockGetTaskProgress.data[1].blockers.length > charactersToShow,
        isReadMoreEnabled: false,
    },
];

const dataToShowStateWithLongContent = [
    {
        id: `completed-${mockGetTaskProgress.data[3].id}`,
        label: 'Completed:',
        body: mockGetTaskProgress.data[3].completed,
        trimmedBody: readMoreFormatter(
            mockGetTaskProgress.data[3].completed,
            charactersToShow
        ),
        shouldReadMoreButtonShow:
            mockGetTaskProgress.data[3].completed.length > charactersToShow,
        isReadMoreEnabled: false,
    },
    {
        id: `planned-${mockGetTaskProgress.data[3].id}`,
        label: 'Planned:',
        body: mockGetTaskProgress.data[3].planned,
        trimmedBody: readMoreFormatter(
            mockGetTaskProgress.data[3].planned,
            charactersToShow
        ),
        shouldReadMoreButtonShow:
            mockGetTaskProgress.data[3].planned.length > charactersToShow,
        isReadMoreEnabled: false,
    },
    {
        id: `blockers-${mockGetTaskProgress.data[3].id}`,
        label: 'Blockers:',
        body: mockGetTaskProgress.data[3].blockers,
        trimmedBody: readMoreFormatter(
            mockGetTaskProgress.data[3].blockers,
            charactersToShow
        ),
        shouldReadMoreButtonShow:
            mockGetTaskProgress.data[3].blockers.length > charactersToShow,
        isReadMoreEnabled: false,
    },
];

describe('ProgressUpdateCardPresentation Component', () => {
    beforeEach(() => {
        mockedOnMoreOrLessButtonClick =
            jest.fn<void, [React.MouseEvent<HTMLElement>]>();
        mockedOnCardClick = jest.fn<void, [React.MouseEvent<HTMLElement>]>();
        initialProps = {
            username: username,
            userProfileImageUrl: userProfileImageUrl,
            titleToShow: titleToShow,
            isExpanded: false,
            dateInAgoFormat: dateInAgoFormat,
            tooltipString: tooltipString,
            dataToShowState: dataToShowState, //left
            onMoreOrLessButtonClick: mockedOnMoreOrLessButtonClick,
            onCardClick: mockedOnCardClick,
        };
    });

    it('should rotate the angle icon when expanded', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: { dev: 'false' },
        });
        const props = { ...initialProps, isExpanded: true };
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...props} />
            </Provider>
        );
        const angleIcon = screen.getByTestId('progress-update-card-angle-icon');
        expect(angleIcon).toHaveStyle('transform: rotate(90deg)');
    });
    it('should have respective classes on date container and date text', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: { dev: 'false' },
        });
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...initialProps} />
            </Provider>
        );
        const dateContainer = screen.getByTestId('progress-update-card-date');
        const dateText = screen.getByText(dateInAgoFormat);

        expect(dateContainer).toHaveClass(
            'progress-update-card__date-container'
        );
        expect(dateText).toHaveClass('progress-update-card__date-text');
    });

    it('should not rotate the angle icon when not expanded', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: { dev: 'false' },
        });
        const props = { ...initialProps, isExpanded: false };
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...props} />
            </Provider>
        );
        const angleIcon = screen.getByTestId('progress-update-card-angle-icon');
        expect(angleIcon).toHaveStyle('transform: none');
    });

    it('should prevent event propagation when clicking on the date container', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: { dev: 'false' },
        });
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...initialProps} />
            </Provider>
        );

        const dateContainer = screen.getByTestId('progress-update-card-date');
        const stopPropagationMock = jest.fn();
        dateContainer.addEventListener(
            'click',
            (event) => (event.stopPropagation = stopPropagationMock)
        );
        fireEvent.click(dateContainer);
        expect(stopPropagationMock).toHaveBeenCalled();
    });

    it('should prevent event propagation when clicking on user avatar', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: { dev: 'true' },
        });
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...initialProps} />
            </Provider>
        );

        const userInfoLink = screen.getByTestId(
            'progress-update-card-user-info-link'
        );
        const stopPropagationMock = jest.fn();
        userInfoLink.addEventListener(
            'click',
            (event) => (event.stopPropagation = stopPropagationMock)
        );
        fireEvent.click(userInfoLink);
        expect(stopPropagationMock).toHaveBeenCalled();
    });

    it('should render completed section string as title in card', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: { dev: 'false' },
        });
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...initialProps} />
            </Provider>
        );
        const cardTitle = screen.getByRole('heading');
        expect(cardTitle).toHaveTextContent(
            mockGetTaskProgress.data[1].completed
        );
    });
    it('should render date with ago format', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: { dev: 'false' },
        });
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...initialProps} />
            </Provider>
        );
        const date = screen.getByTestId('progress-update-card-date');
        expect(date).toHaveTextContent(dateInAgoFormat);
    });
    it('should render the name and profile picture of the updater', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: { dev: 'true' },
        });
        const props: ProgressUpdateCardPresentationProps = {
            ...initialProps,
        };
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...props} />
            </Provider>
        );

        const userProfileImageUrlElement = screen.getByTestId(
            'progress-update-card-profile-picture'
        );

        expect(userProfileImageUrlElement).toBeInTheDocument();
        expect(userProfileImageUrlElement).toHaveAttribute(
            'src',
            userProfileImageUrl
        );
        expect(userProfileImageUrlElement).toHaveAttribute('alt', 'Avatar');
    });

    it('should have respective classes when element is expanded', () => {
        const props: ProgressUpdateCardPresentationProps = {
            ...initialProps,
            isExpanded: true,
        };
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...props} />
            </Provider>
        );

        const progressUpdateCardContainer = screen.getByTestId(
            'progress-update-card-container'
        );
        const progressUpdateCardExpandContent = screen.getByTestId(
            'progress-update-card-expand-content'
        );

        expect(progressUpdateCardContainer).toHaveClass('expand');
        expect(progressUpdateCardExpandContent).toHaveClass('show');
    });

    it('should not have respective classes when element is not expanded', () => {
        const props: ProgressUpdateCardPresentationProps = {
            ...initialProps,
            isExpanded: false,
        };
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...props} />
            </Provider>
        );

        const progressUpdateCardContainer = screen.getByTestId(
            'progress-update-card-container'
        );
        const progressUpdateCardExpandContent = screen.getByTestId(
            'progress-update-card-expand-content'
        );

        expect(progressUpdateCardContainer).not.toHaveClass('expand');
        expect(progressUpdateCardExpandContent).not.toHaveClass('show');
    });

    it('should onCardClick function when user click on card', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...initialProps} />
            </Provider>
        );

        const progressUpdateCardContainer = screen.getByTestId(
            'progress-update-card-container'
        );

        fireEvent.click(progressUpdateCardContainer);
        expect(initialProps.onCardClick).toHaveBeenCalledTimes(1);
    });

    it('should not render the more or less button if content length is small', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...initialProps} />
            </Provider>
        );

        const moreOrLessButtons = screen.queryAllByRole('button');
        moreOrLessButtons.forEach((button) => {
            expect(button).not.toBeInTheDocument();
        });
    });

    it('should trigger the onMoreOrLessButtonClick function when user clicks on the button and button exists for long content length', () => {
        const props: ProgressUpdateCardPresentationProps = {
            ...initialProps,
            dataToShowState: dataToShowStateWithLongContent,
        };
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...props} />
            </Provider>
        );

        const moreOrLessButtons = screen.getAllByRole('button');

        moreOrLessButtons.forEach((button) => {
            expect(button).toBeInTheDocument();
            expect(button).toHaveTextContent('More');
        });

        fireEvent.click(moreOrLessButtons[0]);

        expect(initialProps.onMoreOrLessButtonClick).toHaveBeenCalledTimes(1);
    });

    it('should render the trimmed progress updates  accordingly', () => {
        const props: ProgressUpdateCardPresentationProps = {
            ...initialProps,
            dataToShowState: dataToShowStateWithLongContent,
        };
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...props} />
            </Provider>
        );

        const allProgressUpdatesBody = screen.getAllByTestId(
            'progress-update-card-info-body'
        );
        const trimmedBodyArray: string[] = dataToShowStateWithLongContent.map(
            (data: ProgressUpdateDataToShow) => data.trimmedBody
        );
        allProgressUpdatesBody.forEach((body, idx) => {
            expect(body).toHaveTextContent(trimmedBodyArray[idx] + 'More');
        });
    });

    it('should render the full body of the progress updates with a less button', () => {
        dataToShowStateWithLongContent.forEach((progressUpdate) => {
            progressUpdate.isReadMoreEnabled = true;
        });
        const props: ProgressUpdateCardPresentationProps = {
            ...initialProps,
            dataToShowState: dataToShowStateWithLongContent,
        };
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...props} />
            </Provider>
        );

        const allProgressUpdatesBody = screen.getAllByTestId(
            'progress-update-card-info-body'
        );
        const bodyArray: string[] = dataToShowStateWithLongContent.map(
            (data: ProgressUpdateDataToShow) => data.body
        );
        allProgressUpdatesBody.forEach((body, idx) => {
            expect(body).toHaveTextContent(bodyArray[idx] + 'Less');
        });
    });
});
