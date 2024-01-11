import moment from 'moment';
import { Provider } from 'react-redux';
import { fireEvent, screen } from '@testing-library/react';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { mockGetTaskProgress } from '../../../../../__mocks__/db/progresses';
import ProgressUpdateCard from '@/components/taskDetails/ProgressUpdateCard/ProgressUpdateCard';
import { readMoreFormatter } from '@/utils/common';

let mockedOpenDetailsFunction: jest.Mock<void, [React.MouseEvent<HTMLElement>]>;

beforeEach(() => {
    mockedOpenDetailsFunction =
        jest.fn<void, [React.MouseEvent<HTMLElement>]>();
});

describe('ProgressUpdateCard Component', () => {
    it('should render completed section string as title in card', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard
                    data={mockGetTaskProgress.data[2]}
                    openDetails={mockedOpenDetailsFunction}
                />
            </Provider>
        );

        const cardTitle = screen.getByRole('heading');
        expect(cardTitle).toHaveTextContent(
            mockGetTaskProgress.data[2].completed
        );
    });

    it('should render date with ago format', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard
                    data={mockGetTaskProgress.data[2]}
                    openDetails={mockedOpenDetailsFunction}
                />
            </Provider>
        );
        const dateInAgoFormat = moment(
            mockGetTaskProgress.data[2].createdAt
        ).fromNow();
        const date = screen.getByTestId('progress-update-card-date');

        expect(date).toHaveTextContent(dateInAgoFormat);
    });

    it('should render the tooltip on hover on the date and should not render on mouse out off date', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard
                    data={mockGetTaskProgress.data[2]}
                    openDetails={mockedOpenDetailsFunction}
                />
            </Provider>
        );

        const momentDate = moment(mockGetTaskProgress.data[2].createdAt);
        const fullDate = momentDate.format('DD-MM-YY');
        const time = momentDate.format('hh:mmA');

        const tooltipString = `Updated at ${fullDate}, ${time}`;
        const dateElement = screen.getByTestId('progress-update-card-date');

        fireEvent.mouseOver(dateElement);

        const tooltip = screen.getByTestId('tooltip');

        expect(tooltip).toHaveClass('fade-in');
        expect(tooltip).toHaveTextContent(tooltipString);

        fireEvent.mouseOut(dateElement);

        expect(tooltip).toHaveClass('fade-out');
    });

    it('should not show more or less button if text is smaller than charactersToShow', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard
                    data={mockGetTaskProgress.data[2]}
                    openDetails={mockedOpenDetailsFunction}
                />
            </Provider>
        );

        const moreOrLessButton = screen.queryByRole('button');

        expect(moreOrLessButton).not.toBeInTheDocument();
    });

    it('should show the more or less button when text is greater than charactersToShow', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard
                    data={mockGetTaskProgress.data[3]}
                    openDetails={mockedOpenDetailsFunction}
                />
            </Provider>
        );

        const moreOrLessButton = screen.getByRole('button');

        expect(moreOrLessButton).toBeInTheDocument();
    });

    it('should toggle the text between More and Less when more or less button is clicked', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard
                    data={mockGetTaskProgress.data[3]}
                    openDetails={mockedOpenDetailsFunction}
                />
            </Provider>
        );

        const moreOrLessButton = screen.getByRole('button');

        expect(moreOrLessButton).toHaveTextContent('More');

        fireEvent.click(moreOrLessButton);

        expect(moreOrLessButton).toHaveTextContent('Less');
    });

    it('should show trimmed value in title if length is greater than charactersToShow and show full title when click on more or less button', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard
                    data={mockGetTaskProgress.data[3]}
                    openDetails={mockedOpenDetailsFunction}
                />
            </Provider>
        );
        const moreOrLessButton = screen.getByRole('button');
        const charactersToShow = 70;
        const trimmedTitle = readMoreFormatter(
            mockGetTaskProgress.data[3].completed,
            charactersToShow
        );

        const titleContainer = screen.getByRole('heading');
        expect(titleContainer).toHaveTextContent(trimmedTitle + 'More');

        fireEvent.click(moreOrLessButton);
        expect(titleContainer).toHaveTextContent(
            mockGetTaskProgress.data[3].completed + 'Less'
        );
    });
});
