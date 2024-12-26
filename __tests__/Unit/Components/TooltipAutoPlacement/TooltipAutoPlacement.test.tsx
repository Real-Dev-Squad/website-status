import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { fireEvent, screen } from '@testing-library/react';
import TooltipAutoPlacement from '@/components/common/TooltipAutoPlacement/Tooltip';

describe('Tooltip Auto Placement Component', () => {
    beforeEach(() => {
        global.innerWidth = 1024;
        global.innerHeight = 768;
    });

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
    it('should display the correct content in the tooltip', () => {
        const tooltipContent = 'Expected Tooltip Content';

        renderWithRouter(
            <Provider store={store()}>
                <TooltipAutoPlacement content={tooltipContent}>
                    <div data-testid="trigger">Trigger</div>
                </TooltipAutoPlacement>
            </Provider>
        );

        fireEvent.mouseOver(screen.getByTestId('trigger'));
        const tooltip = screen.getByTestId('tooltip');

        expect(tooltip).toBeVisible();
        expect(tooltip.textContent).toBe(tooltipContent);
    });
    it('should handle small viewport sizes', () => {
        global.innerWidth = 320;
        global.innerHeight = 480;

        renderWithRouter(
            <Provider store={store()}>
                <TooltipAutoPlacement content="Tooltip content">
                    <div
                        data-testid="trigger"
                        style={{ position: 'absolute', bottom: 0 }}
                    >
                        Trigger
                    </div>
                </TooltipAutoPlacement>
            </Provider>
        );

        fireEvent.mouseOver(screen.getByTestId('trigger'));

        const tooltip = screen.getByTestId('tooltip');
        const styles = window.getComputedStyle(tooltip);

        expect(tooltip).toBeVisible();

        const left = parseInt(styles.left, 10);
        const top = parseInt(styles.top, 10);

        expect(left).toBeGreaterThanOrEqual(0);
        expect(top).toBeGreaterThanOrEqual(0);
        expect(left).toBeLessThanOrEqual(global.innerWidth);
        expect(top).toBeLessThanOrEqual(global.innerHeight);
        expect(tooltip.textContent).toBe('Tooltip content');
    });

    it('should handle long content correctly', () => {
        const longContent = 'A'.repeat(200);

        renderWithRouter(
            <Provider store={store()}>
                <TooltipAutoPlacement content={longContent}>
                    <div data-testid="trigger">Trigger</div>
                </TooltipAutoPlacement>
            </Provider>
        );

        fireEvent.mouseOver(screen.getByTestId('trigger'));
        const tooltip = screen.getByTestId('tooltip');

        expect(tooltip).toBeVisible();
        expect(tooltip.textContent).toBe(longContent);
    });

    it('should handle tooltip with complex content', () => {
        const complexContent = (
            <div>
                <h3>Complex Title</h3>
                <p>Multiple paragraphs</p>
                <ul>
                    <li>List item 1</li>
                    <li>List item 2</li>
                </ul>
            </div>
        );

        renderWithRouter(
            <Provider store={store()}>
                <TooltipAutoPlacement content={complexContent}>
                    <div data-testid="trigger">Trigger</div>
                </TooltipAutoPlacement>
            </Provider>
        );

        fireEvent.mouseOver(screen.getByTestId('trigger'));
        const tooltip = screen.getByTestId('tooltip');

        expect(tooltip).toBeVisible();
        expect(tooltip.querySelector('h3')).toBeInTheDocument();
        expect(tooltip.querySelectorAll('li')).toHaveLength(2);
    });

    it('should reposition tooltip on viewport resize', () => {
        renderWithRouter(
            <Provider store={store()}>
                <TooltipAutoPlacement content="Tooltip content">
                    <div data-testid="trigger">Trigger</div>
                </TooltipAutoPlacement>
            </Provider>
        );

        fireEvent.mouseOver(screen.getByTestId('trigger'));
        global.innerWidth = 500;
        global.innerHeight = 300;
        window.dispatchEvent(new Event('resize'));

        const tooltip = screen.getByTestId('tooltip');
        const tooltipRect = tooltip.getBoundingClientRect();
        expect(tooltipRect.right).toBeLessThanOrEqual(window.innerWidth);
        expect(tooltipRect.bottom).toBeLessThanOrEqual(window.innerHeight);
    });

    it('should handle unusual placement (top-left corner)', async () => {
        renderWithRouter(
            <Provider store={store()}>
                <TooltipAutoPlacement content="Tooltip content">
                    <div
                        data-testid="trigger"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                    >
                        Trigger
                    </div>
                </TooltipAutoPlacement>
            </Provider>
        );

        fireEvent.mouseMove(screen.getByTestId('trigger'));
        const tooltip = screen.getByTestId('tooltip');
        const tooltipRect = tooltip.getBoundingClientRect();
        expect(tooltipRect.left).toBeGreaterThanOrEqual(0);
        expect(tooltipRect.top).toBeGreaterThanOrEqual(0);
    });
});
