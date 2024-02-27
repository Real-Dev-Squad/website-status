import { Provider } from 'react-redux';
import { store } from '@/app/store';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { fireEvent, screen } from '@testing-library/react';

describe.only('Tooltip Component', () => {
    it('should render the tooltip on hover', () => {
        renderWithRouter(
            <Provider store={store()}>
                <Tooltip content="This is tooltip">
                    <div data-testid="content">This is great</div>
                </Tooltip>
            </Provider>
        );
        const content = screen.getByTestId('content');
        fireEvent.mouseOver(content);
        const classList = screen.getByTestId('tooltip').classList;
        expect(classList).toContain('fade-in');
    });
    it('should not render the tooltip on hover', () => {
        renderWithRouter(
            <Provider store={store()}>
                <Tooltip content="This is tooltip">
                    <div>This is great</div>
                </Tooltip>
            </Provider>
        );
        const classList = screen.getByTestId('tooltip').classList;
        expect(classList).toContain('fade-out');
    });
});
