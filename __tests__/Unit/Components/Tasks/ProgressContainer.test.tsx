import { store } from '@/app/store';
import ProgressContainer from '@/components/tasks/card/progressContainer';
import { renderWithRouter } from '@/test_utils/createMockRouter';
import { CONTENT } from '../../../../__mocks__/db/tasks';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import handlers from '../../../../__mocks__/handlers';
import { setupServer } from 'msw/node';
import ProgressSlider from '@/components/tasks/card/progressContainer/ProgressSlider';

const server = setupServer(...handlers);

describe('ProgressContainer', () => {
    beforeAll(() => {
        server.listen();
    });
    afterEach(() => {
        server.resetHandlers();
    });
    afterAll(() => {
        server.close();
    });

    const debounceSliderMock = jest.fn();
    const handleProgressChangeMock = jest.fn();

    const ProgressSliderProps = {
        value: 50,
        debounceSlider: debounceSliderMock,
        handleProgressChange: handleProgressChangeMock,
        isLoading: false,
    };

    test('should render progress bar component', async () => {
        const { container } = renderWithRouter(
            <Provider store={store()}>
                <ProgressContainer content={CONTENT} />
            </Provider>,
            {
                query: { dev: 'true' },
            }
        );
        render(<ProgressSlider {...ProgressSliderProps} />);
        screen.debug();
        const boxes = container.getElementsByClassName('progressGreen');
        expect(boxes[0]).toHaveClass('progressGreen');
        expect(await screen.findByText('0%')).toBeInTheDocument();
        const sliderInput = screen.getByRole('slider');
        await fireEvent.change(sliderInput, { target: { value: 50 } });
        screen.debug();
        expect(sliderInput).toBeInTheDocument();
    });
});
