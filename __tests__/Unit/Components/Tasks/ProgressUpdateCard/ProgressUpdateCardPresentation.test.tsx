import moment from 'moment';
import { MouseEvent } from 'react';
import { Provider } from 'react-redux';
import { fireEvent, screen } from '@testing-library/react';

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
        mockedOnMoreOrLessButtonClick = jest.fn<
            void,
            [React.MouseEvent<HTMLElement>]
        >();
        mockedOnCardClick = jest.fn<void, [React.MouseEvent<HTMLElement>]>();
        initialProps = {
            titleToShow: titleToShow,
            isExpanded: false,
            dateInAgoFormat: dateInAgoFormat,
            tooltipString: tooltipString,
            dataToShowState: dataToShowState, //left
            onMoreOrLessButtonClick: mockedOnMoreOrLessButtonClick,
            onCardClick: mockedOnCardClick,
        };
    });
    it('should render completed section string as title in card', () => {
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
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...initialProps} />
            </Provider>
        );
        const date = screen.getByTestId('progress-update-card-date');
        expect(date).toHaveTextContent(dateInAgoFormat);
    });

    it('should not render the tooltip when isToolisTooltipVisible is false', () => {
        const props: ProgressUpdateCardPresentationProps = {
            ...initialProps,
        };
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCardPresentation {...props} />
            </Provider>
        );

        const tooltip = screen.getByTestId('tooltip');
        expect(tooltip).toHaveTextContent(tooltipString);
        expect(tooltip).toHaveClass('tooltip fade-out');
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
