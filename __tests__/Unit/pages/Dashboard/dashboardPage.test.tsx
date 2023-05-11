import DashboardPage from '@/pages/dashboard';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { screen } from '@testing-library/react';

describe('dashboard page test', function () {
    it('checks if the page is rendered with exact components', function () {
        renderWithRouter(
            <Provider store={store()}>
                <DashboardPage />
            </Provider>,
            { query: { dev: 'true' } }
        );

        const searchBar = screen.getByRole('textbox');
        expect(searchBar).toBeInTheDocument();

        const searchButton = screen.getByRole('button');
        expect(searchButton.innerHTML).toBe('Search');

        const label = screen.getByLabelText('Users');
        expect(label).toBeInTheDocument();
    });

    it('renders 404 without passing the feature flag', function () {
        renderWithRouter(
            <Provider store={store()}>
                <DashboardPage />
            </Provider>
        );

        const headings = screen.getAllByRole('heading');
        expect(headings).toHaveLength(1);
        expect(headings[0].innerHTML).toBe('404 - Page Not Found');
    });
});
