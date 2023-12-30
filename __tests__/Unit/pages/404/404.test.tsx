import PageNotFound from '@/pages/404';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { screen } from '@testing-library/react';

describe('PageNotFound', () => {
    it('should render the PageNotFound component', () => {
        renderWithRouter(
            <Provider store={store()}>
                <PageNotFound />
            </Provider>
        );
        const notFoundText = screen.getByText(/404 - Page Not Found/i);
        expect(notFoundText).toBeInTheDocument();
        const notFoundImage = screen.getByAltText(/404 - Page Not Found/i);
        expect(notFoundImage).toBeInTheDocument();
    });
});
