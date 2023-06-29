import StandUp from '@/pages/standup';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import * as AuthenticatedHooks from '@/hooks/useAuthenticated';
import * as useGetUserQueryHook from '@/app/services/userApi';

describe('Standup', () => {
    test('should be able to render standup component if user is  logged-in and authenticated', () => {
        jest.spyOn(useGetUserQueryHook, 'useGetUserQuery').mockImplementation(
            (): ReturnType<typeof useGetUserQueryHook.useGetUserQuery> =>
                ({
                    isLoading: false,
                } as unknown as ReturnType<
                    typeof useGetUserQueryHook.useGetUserQuery
                >)
        );
        jest.spyOn(AuthenticatedHooks, 'default').mockImplementation(() => ({
            isLoggedIn: true,
            isLoading: true,
            userData: {
                userName: 'Pratiyush',
                firstName: 'Pratiyush',
                profilePicture: '',
            },
        }));
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <StandUp />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        expect(getByText('Loading...')).toBeInTheDocument();
        expect(getByText('Standup')).toBeInTheDocument();
    });

    test('should not be able to render standup component if user is not logged-in and not authenticated', () => {
        jest.spyOn(useGetUserQueryHook, 'useGetUserQuery').mockImplementation(
            (): ReturnType<typeof useGetUserQueryHook.useGetUserQuery> =>
                ({
                    isLoading: true,
                } as unknown as ReturnType<
                    typeof useGetUserQueryHook.useGetUserQuery
                >)
        );
        jest.spyOn(AuthenticatedHooks, 'default').mockImplementation(() => ({
            isLoggedIn: false,
            isLoading: false,
            userData: {
                userName: 'Pratiyush',
                firstName: 'Pratiyush',
                profilePicture: '',
            },
        }));
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <StandUp />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        expect(getByText('You are not Authorized')).toBeInTheDocument();
    });

    test('should not be able to render standup component if user is not logged-in and not loading', () => {
        jest.spyOn(useGetUserQueryHook, 'useGetUserQuery').mockImplementation(
            (): ReturnType<typeof useGetUserQueryHook.useGetUserQuery> =>
                ({
                    isLoading: false,
                } as unknown as ReturnType<
                    typeof useGetUserQueryHook.useGetUserQuery
                >)
        );
        jest.spyOn(AuthenticatedHooks, 'default').mockImplementation(() => ({
            isLoggedIn: true,
            isLoading: false,
            userData: {
                userName: 'Pratiyush',
                firstName: 'Pratiyush',
                profilePicture: '',
            },
        }));
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

    test('should not be able to render standup component if user is authernticated and not loggedin', () => {
        jest.spyOn(useGetUserQueryHook, 'useGetUserQuery').mockImplementation(
            (): ReturnType<typeof useGetUserQueryHook.useGetUserQuery> =>
                ({
                    isLoading: false,
                } as unknown as ReturnType<
                    typeof useGetUserQueryHook.useGetUserQuery
                >)
        );
        jest.spyOn(AuthenticatedHooks, 'default').mockImplementation(() => ({
            isLoggedIn: false,
            isLoading: false,
            userData: {
                userName: 'Pratiyush',
                firstName: 'Pratiyush',
                profilePicture: '',
            },
        }));
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <StandUp />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        expect(getByText('You are not Authorized')).toBeInTheDocument();
    });

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
});
