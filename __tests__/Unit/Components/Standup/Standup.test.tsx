import StandUp from '@/pages/standup';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { screen } from '@testing-library/react';
import { LOGIN_URL } from '@/constants/url';

describe.only('Standup', () => {
    test('should render stanup component if feature flag is true', () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <StandUp />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        expect(getByText('Standup')).toBeInTheDocument();
    });
    test('should render 404 Page component if feature flag is false', () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <StandUp />
            </Provider>,
            {
                query: { dev: 'false' },
            }
        );
        expect(getByText('404 - Page Not Found')).toBeInTheDocument();
    });
    // test('renders unauthorized message and login link when not authenticated', () => {
    //     // Mock the useAuthenticated hook to return unauthenticated state
    //     jest.mock('@/hooks/useAuthenticated', () => ({
    //         __esModule: true,
    //         default: jest.fn(() => ({
    //             isLoggedIn: false,
    //             isLoading: false,
    //         })),
    //     }));

    //     const { getByText } = renderWithRouter(
    //         <Provider store={store()}>
    //             <StandUp />
    //         </Provider>
    //     );
    //     expect(getByText('You are not Authorized')).toBeInTheDocument();
    //     expect(getByText('Click here to Login')).toHaveAttribute(
    //         'href',
    //         LOGIN_URL
    //     );
    // });
});
