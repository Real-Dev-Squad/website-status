import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '@/app/store';

import { renderWithRouter } from '@/test_utils/createMockRouter';

import ProgressUpdatesPage from '@/pages/progressUpdates/[id]';


describe('Progress updates Page test', function () {
    test('Renders 404 page if no id is provided', () => {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdatesPage/>
            </Provider>
        );
        const headings = screen.getAllByRole('heading');
        expect(headings).toHaveLength(1);
        expect(headings[0].innerHTML).toBe('404 - Page Not Found');
    });

    test('Renders Progress Updates page', async () => {
        const id = '123';
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdatesPage/>
            </Provider>, {query: { id }}
        );
        const welcome_message = await screen.findByTestId('welcome-message');
        expect(welcome_message).toBeDefined();
    });
});