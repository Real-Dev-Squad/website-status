import StandUp from '@/pages/standup';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import * as AuthenticatedHooks from '@/hooks/useAuthenticated';
import {
    userLoggedIn,
    userNotLoggedIn,
    notLoading,
} from '../../../../__mocks__/db/standup';

describe('Standup', () => {
    test('should be able to render standup component if user is  logged-in and authenticated', () => {
        jest.spyOn(AuthenticatedHooks, 'default').mockImplementation(
            () => userLoggedIn
        );
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
        jest.spyOn(AuthenticatedHooks, 'default').mockImplementation(
            () => userNotLoggedIn
        );
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

    test('should not be able to render standup component if user is logged-in and loading is false', () => {
        jest.spyOn(AuthenticatedHooks, 'default').mockImplementation(
            () => notLoading
        );
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
    //     jest.spyOn(useGetUserQueryHook, 'useGetUserQuery').mockImplementation(
    //         (): ReturnType<typeof useGetUserQueryHook.useGetUserQuery> =>
    //             ({
    //                 isLoading: false,
    //             } as unknown as ReturnType<
    //                 typeof useGetUserQueryHook.useGetUserQuery
    //             >)
    //     );
    //     jest.spyOn(AuthenticatedHooks, 'default').mockImplementation(() => ({
    //         isLoggedIn: false,
    //         isLoading: false,
    //         userData: {
    //             userName: 'Pratiyush',
    //             firstName: 'Pratiyush',
    //             profilePicture: '',
    //         },
    //     }));
    //     const { getByText } = renderWithRouter(
    //         <Provider store={store()}>
    //             <StandUp />
    //         </Provider>,
    //         {
    //             query: { dev: 'true' },
    //         }
    //     );
    //     expect(getByText('You are not Authorized')).toBeInTheDocument();
    // });

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
    test('should render 404 Page component if feature flag value is not a boolean', () => {
        const { getByText } = renderWithRouter(
            <Provider store={store()}>
                <StandUp />
            </Provider>,
            {
                query: { dev: '123' },
            }
        );
        expect(getByText('404 - Page Not Found')).toBeInTheDocument();
    });
});
