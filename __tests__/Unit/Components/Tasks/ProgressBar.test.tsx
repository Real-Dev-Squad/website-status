import { store } from '@/app/store';
import Progressbar from '@/components/tasks/card/progressContainer/ProgressBar';
import ProgressIndicator from '@/components/tasks/card/progressContainer/ProgressIndicator';
import ProgressSlider from '@/components/tasks/card/progressContainer/ProgressSlider';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        query: { dev: 'true' },
    }),
}));

const DEFAULT_PROPS = {
    progressValue: 40,
    percentCompleted: 50,
    handleProgressChange: jest.fn(),
    debounceSlider: jest.fn(),
    startedOn: '03/07/2023',
    endsOn: '10/07/2023',
};

describe('Progress Bar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should render Progress slider component if progress is true', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'true' },
        }));

        renderWithRouter(
            <Provider store={store()}>
                <Progressbar
                    {...DEFAULT_PROPS}
                    progress={true}
                    isLoading={false}
                />
            </Provider>,
            { query: { dev: 'true' } }
        );

        const sliderInput = screen.getByRole('slider');
        expect(sliderInput).toBeInTheDocument();
        expect(sliderInput).toHaveValue('40');
    });

    test('Should render Progress Indicator component if progress is false', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'false' },
        }));

        renderWithRouter(
            <Provider store={store()}>
                <Progressbar
                    {...DEFAULT_PROPS}
                    progress={false}
                    isLoading={false}
                />
            </Provider>,
            { query: { dev: 'false' } }
        );

        const progressIndicator = screen.getByText('40%');
        expect(progressIndicator).toBeInTheDocument();
    });

    test('Should render Progress Slider independently', () => {
        render(
            <ProgressSlider
                value={50}
                debounceSlider={DEFAULT_PROPS.debounceSlider}
                handleProgressChange={DEFAULT_PROPS.handleProgressChange}
                isLoading={false}
            />
        );

        const sliderInput = screen.getByRole('slider');
        expect(sliderInput).toBeInTheDocument();
        fireEvent.change(sliderInput, { target: { value: 60 } });
        expect(DEFAULT_PROPS.handleProgressChange).toHaveBeenCalled();
    });

    test('Should handle dev mode correctly', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'true' },
        }));

        renderWithRouter(
            <Provider store={store()}>
                <Progressbar
                    {...DEFAULT_PROPS}
                    progress={true}
                    isLoading={false}
                />
            </Provider>,
            { query: { dev: 'true' } }
        );

        const progressElement = screen.getByRole('slider');
        expect(progressElement).toHaveClass('slider');
    });
});
