import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';

import ProgressUpdatesPage from '@/pages/progress/[id]';

describe('Progress page test', function () {
    it('Renders a form', function () {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdatesPage />
            </Provider>,
            { query: { id: '123', dev: 'true' } }
        );
        const textBoxes = screen.getAllByRole('textbox');
        expect(textBoxes).toHaveLength(3);
        const button = screen.getByRole('button') as HTMLButtonElement;
        expect(button).toBeInTheDocument();
        expect(button.type).toBe('submit');
    });

    it('should return 404 if no id is passed', function () {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdatesPage />
            </Provider>,
            { query: { dev: 'true' } }
        );
        const headings = screen.getAllByRole('heading');
        expect(headings).toHaveLength(1);
        expect(headings[0].innerHTML).toBe('404 - Page Not Found');
    });

    it('should return 404 if no dev flag is passed', function () {
        renderWithRouter(
            <Provider store={store()}>
                <ProgressUpdatesPage />
            </Provider>,
            { query: { id: '123' } }
        );
        const headings = screen.getAllByRole('heading');
        expect(headings).toHaveLength(1);
        expect(headings[0].innerHTML).toBe('404 - Page Not Found');
    });
});
