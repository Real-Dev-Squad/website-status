import StandUp from '@/pages/standup';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import {
    createMockRouter,
    renderWithRouter,
} from '@/test_utils/createMockRouter';

describe('Standup', () => {
    test('renders the missed updates of the user', () => {
        const { queryByTestId } = renderWithRouter(
            <Provider store={store()}>
                <RouterContext.Provider
                    value={createMockRouter({}) as NextRouter}
                ></RouterContext.Provider>
                <StandUp />
            </Provider>
        );

        expect(queryByTestId('missed-updates')).toBeInTheDocument();
    });
    test('renders the yesterday Update Input', () => {
        const { queryByTestId } = renderWithRouter(
            <Provider store={store()}>
                <RouterContext.Provider
                    value={createMockRouter({}) as NextRouter}
                ></RouterContext.Provider>
                <StandUp />
            </Provider>
        );

        expect(queryByTestId('yesterday-input-update')).toBeInTheDocument();
    });
    test('renders the Today Update Input', () => {
        const { queryByTestId } = renderWithRouter(
            <Provider store={store()}>
                <RouterContext.Provider
                    value={createMockRouter({}) as NextRouter}
                ></RouterContext.Provider>
                <StandUp />
            </Provider>
        );
        expect(queryByTestId('today-input-update')).toBeInTheDocument();
    });
    test('renders the blocker Input', () => {
        const { queryByTestId } = renderWithRouter(
            <Provider store={store()}>
                <RouterContext.Provider
                    value={createMockRouter({}) as NextRouter}
                ></RouterContext.Provider>
                <StandUp />
            </Provider>
        );

        expect(queryByTestId('blocker-input-update')).toBeInTheDocument();
    });
});
