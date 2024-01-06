import { Provider } from 'react-redux';
import { store } from '@/app/store';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { screen } from '@testing-library/react';

describe('Tooltip Component', () => {
    it('should render the component with the passed data', () => {
        renderWithRouter(
            <Provider store={store()}>
                <Tooltip textToShow="This is a demo tooltip text" />
            </Provider>
        );
        const tooltip = screen.getByTestId('tooltip');

        expect(tooltip).toHaveTextContent('This is a demo tooltip text');
    });
});
