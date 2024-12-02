import ProgressIndicator from '@/components/tasks/card/progressContainer/ProgressIndicator';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const DEFAULT_PROPS = {
    percentCompleted: 50,
    startedOn: '10 July 2023',
    endsOn: '14 July 2023',
};

describe('Progress Indicator', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({
            query: {
                dev: 'true',
            },
        });
    });

    test('should render the ProgressIndicator in dev mode', () => {
        const { container } = render(<ProgressIndicator {...DEFAULT_PROPS} />);
        const sliderDiv = container.getElementsByClassName('slider');
        const childDiv = container.getElementsByClassName('progressStyle');

        expect(sliderDiv.length).toBe(1);
        expect(childDiv.length).toBe(1);
    });

    test('should render the ProgressIndicator in production mode', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: {
                dev: 'false',
            },
        });

        const { container } = render(<ProgressIndicator {...DEFAULT_PROPS} />);
        const progressIndicatorDiv =
            container.getElementsByClassName('progressIndicator');
        const childDiv = container.getElementsByClassName('progressStyle');

        expect(progressIndicatorDiv.length).toBe(1);
        expect(childDiv.length).toBe(1);
    });
});
