import { setupServer } from 'msw/node';
import handlers from '../../../../__mocks__/handlers';
import MainForm from '@/components/standup/MainForm';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { screen, waitFor } from '@testing-library/react';

const server = setupServer(...handlers);

describe('MainFOrm', () => {
    beforeAll(() => {
        server.listen();
    });
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => {
        server.close();
    });

    test('If isFormVisible is true it should render form for standup. ', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <MainForm isFormVisible={true} />
            </Provider>
        );

        await waitFor(() =>
            expect(screen.getByRole('form')).toBeInTheDocument()
        );
    });
    test('If isFormVisible is false it should render form for standup. ', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <MainForm isFormVisible={false} />
            </Provider>
        );

        await waitFor(() =>
            expect(
                screen.getByText(
                    'Your standup for the day has already been submitted, please fill out the form tomorrow after 6:00 a.m.'
                )
            ).toBeInTheDocument()
        );
    });
});
