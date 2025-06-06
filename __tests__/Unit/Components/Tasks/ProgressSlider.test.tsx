import ProgressSlider from '@/components/tasks/card/progressContainer/ProgressSlider';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Progress Slider', () => {
    const DEFAULT_PROPS = {
        debounceSlider: jest.fn(),
        handleProgressChange: jest.fn(),
    };

    beforeEach(() => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'false' },
        }));
    });

    test('should render range input field', async () => {
        render(
            <ProgressSlider {...DEFAULT_PROPS} value={40} isLoading={false} />
        );
        const sliderInput = screen.getByRole('slider');
        await fireEvent.change(sliderInput, { target: { value: 50 } });
        expect(DEFAULT_PROPS.handleProgressChange).toHaveBeenCalled();
        fireEvent.mouseUp(sliderInput);
        expect(DEFAULT_PROPS.debounceSlider).toHaveBeenCalled();
        expect(sliderInput).toBeInTheDocument();
    });

    test('should render range input field and handle touch events', async () => {
        render(
            <ProgressSlider {...DEFAULT_PROPS} value={40} isLoading={false} />
        );
        const sliderInput = screen.getByRole('slider');
        fireEvent.touchEnd(sliderInput, { target: { value: 50 } });
        expect(DEFAULT_PROPS.debounceSlider).toHaveBeenCalled();
        expect(sliderInput).toBeInTheDocument();
    });

    test('should render with dev mode styles when dev query is true', async () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'true' },
        }));

        render(
            <ProgressSlider {...DEFAULT_PROPS} value={40} isLoading={false} />
        );
        const sliderInput = screen.getByRole('slider');
        expect(sliderInput).toBeInTheDocument();
    });

    test('should clear previous timeout and set new one in dev mode', async () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'true' },
        }));

        jest.useFakeTimers();
        const debounceSlider = jest.fn();

        render(
            <ProgressSlider
                {...DEFAULT_PROPS}
                value={40}
                isLoading={false}
                debounceSlider={debounceSlider}
            />
        );

        const sliderInput = screen.getByRole('slider');

        for (let i = 0; i < 3; i++) {
            fireEvent.change(sliderInput, { target: { value: 50 + i * 10 } });
            fireEvent.mouseUp(sliderInput);
        }

        expect(debounceSlider).toHaveBeenCalledTimes(1);
        expect(debounceSlider).toHaveBeenLastCalledWith(1000);

        jest.useRealTimers();
    });

    test('should not clear previous timeout in non-dev mode', async () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'false' },
        }));

        jest.useFakeTimers();
        const debounceSlider = jest.fn();

        render(
            <ProgressSlider
                {...DEFAULT_PROPS}
                value={40}
                isLoading={false}
                debounceSlider={debounceSlider}
            />
        );

        const sliderInput = screen.getByRole('slider');

        for (let i = 0; i < 3; i++) {
            fireEvent.change(sliderInput, { target: { value: 50 + i * 10 } });
            fireEvent.mouseUp(sliderInput);
        }

        expect(debounceSlider).toHaveBeenCalledTimes(3);
        expect(debounceSlider).toHaveBeenLastCalledWith(1000);

        jest.useRealTimers();
    });
});
