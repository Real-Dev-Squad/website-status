import { store } from '@/app/store';
import ProgressUpdateCard from '@/components/taskDetails/ProgressUpdateCard/ProgressUpdateCard';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { mockGetTaskProgress } from '../../../../__mocks__/db/progresses';
import handlers from '../../../../__mocks__/handlers';

const server = setupServer(...handlers);

let mockedOpenDetailsFunction: jest.Mock<void, [React.MouseEvent<HTMLElement>]>;

beforeAll(() => {
    server.listen({
        onUnhandledRequest: 'error',
    });
    mockedOpenDetailsFunction =
        jest.fn<void, [React.MouseEvent<HTMLElement>]>();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProgressDetails Component', () => {
    it('should render the ProgressUpdateCard', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdateCard
                    data={mockGetTaskProgress.data[2]}
                    openDetails={mockedOpenDetailsFunction}
                />
            </Provider>
        );

        const cardTitle = screen.getByRole('heading');
        expect(cardTitle).toBeInTheDocument();
    });
});
