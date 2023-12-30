import moment from 'moment';
import { Provider } from 'react-redux';
import { fireEvent, screen } from '@testing-library/react';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { mockGetTaskProgress } from '../../../../../__mocks__/db/progresses';
import ProgressUpdateCard from '@/components/taskDetails/ProgressUpdateCard/ProgressUpdateCard';

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

        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent(tooltipString);

        fireEvent.mouseOut(dateElement);

        expect(tooltip).not.toBeInTheDocument();
    });
});
