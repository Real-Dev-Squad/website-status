import { store } from '@/app/store';
import { Provider } from 'react-redux';
import StandUpContainer from '@/components/standup';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '@/test_utils/createMockRouter';

describe('Standup', () => {
    test('renders the missed updates of the user', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(screen.getByTestId('missed-updates')).toBeInTheDocument();
    });
    test('renders the yesterday Update Input', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(
            screen.queryByTestId('yesterday-input-update')
        ).toBeInTheDocument();
    });
    test('renders the Today Update Input', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(screen.queryByTestId('today-input-update')).toBeInTheDocument();
    });
    test('renders the blocker Input', () => {
        renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        expect(
            screen.queryByTestId('blocker-input-update')
        ).toBeInTheDocument();
    });
});
