import StandUpContainer from '@/components/standup';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { screen } from '@testing-library/react';

describe('StandupContainer', () => {
    test('should render  standup Form ', function () {
        const { container } = renderWithRouter(
            <Provider store={store()}>
                <StandUpContainer />
            </Provider>
        );
        screen.debug();
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        const addButton = container.getElementsByClassName('addButton');
        expect(screen.getByText('Standup Update')).toBeInTheDocument();
        expect(screen.getByText('Yesterday')).toBeInTheDocument();
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('Blocker')).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(addButton.length).toBe(3);
    });
});
