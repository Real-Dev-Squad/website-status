import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { fireEvent, screen } from '@testing-library/react';
import TooltipAutoPlacement from '@/components/common/TooltipAutoPlacement/Tooltip';

describe('Tooltip Auto Placement Component', () => {
    it('should render the tooltip on hover', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TooltipAutoPlacement content="This is tooltip">
                    <div data-testid="content">This is great</div>
                </TooltipAutoPlacement>
            </Provider>
        );
        const content = screen.getByTestId('content');
        fireEvent.mouseOver(content);
        const classList = screen.getByTestId('tooltip').classList;
        expect(classList).toContain('fade-in');
    });
    it('should not have fade-in or fade-out classes on initial render', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TooltipAutoPlacement content="This is tooltip">
                    <div data-testid="content">This is great</div>
                </TooltipAutoPlacement>
            </Provider>
        );
        const classList = screen.getByTestId('tooltip').classList;
        expect(classList).not.toContain('fade-in');
        expect(classList).not.toContain('fade-out');
        expect(classList).toContain('tooltip');
    });
    it('should not have fade-in class after hover and exit', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TooltipAutoPlacement content="This is tooltip">
                    <div data-testid="content">This is great</div>
                </TooltipAutoPlacement>
            </Provider>
        );
        const content = screen.getByTestId('content');
        fireEvent.mouseOver(content);
        fireEvent.mouseLeave(content);
        const classList = screen.getByTestId('tooltip').classList;
        expect(classList).not.toContain('fade-in');
    });
});
