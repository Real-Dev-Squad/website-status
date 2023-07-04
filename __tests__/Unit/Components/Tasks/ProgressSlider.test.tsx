import ProgressSlider from '@/components/tasks/card/ProgressSlider';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Progress Slider', () => {
    const DEFAULT_PROPS = {
        debounceSlider: jest.fn(),
        handleProgressChange: jest.fn(),
    };
    test('should render range input field', async () => {
        render(<ProgressSlider {...DEFAULT_PROPS} value={40} />);
        const sliderInput = screen.getByRole('slider');
        await fireEvent.change(sliderInput, { target: { value: 50 } });
        expect(DEFAULT_PROPS.handleProgressChange).toHaveBeenCalled();
        fireEvent.mouseUp(sliderInput);
        expect(DEFAULT_PROPS.debounceSlider).toHaveBeenCalled();
        expect(sliderInput).toBeInTheDocument();
    });
});
