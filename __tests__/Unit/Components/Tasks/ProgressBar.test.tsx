import { store } from '@/app/store';
import HandleProgressbar from '@/components/tasks/card/ProgressBar';
import ProgressIndicator from '@/components/tasks/card/ProgressIndicator';
import ProgressSlider from '@/components/tasks/card/ProgressSlider';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

const DEFAULT_PROPS = {
    progressValue: 40,
    percentCompleted: 50,
    handleProgressChange: jest.fn(),
    debounceSlider: jest.fn(),
    startedOn: '03/07/2023',
    endsOn: '10//07/2023',
};

const ProgressSliderProps = {
    value: 50,
    handleProgressChange: jest.fn(),
    debounceSlider: jest.fn(),
};

const ProgressIndicatorProps = {
    percentCompleted: 50,
    startedOn: '03/07/2023',
    endsOn: '10//07/2023',
};

describe('Progress Bar', () => {
    test('Should render Progress slider component if progress is true', () => {
        renderWithRouter(
            <Provider store={store()}>
                <HandleProgressbar {...DEFAULT_PROPS} progress={true} />
            </Provider>,
            { query: { dev: 'true' } }
        );
        render(<ProgressSlider {...ProgressSliderProps} />);
        expect(screen.getByText('40%')).toBeInTheDocument();
    });
    test('Should render Progress Indicator component if progress is false', () => {
        renderWithRouter(
            <Provider store={store()}>
                <HandleProgressbar {...DEFAULT_PROPS} progress={false} />
            </Provider>
        ),
            { query: { dev: 'false' } };
        render(<ProgressIndicator {...ProgressIndicatorProps} />);
        expect(screen.getByText('50%')).toBeInTheDocument();
    });
});
