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
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'false' },
        }));
    });

    test('should render the ProgressIndicator', () => {
        const { container } = render(<ProgressIndicator {...DEFAULT_PROPS} />);
        const parentDiv = container.getElementsByClassName('slider');
        const childDiv = container.getElementsByClassName('progressStyle');
        expect(parentDiv.length).toBe(1);
        expect(childDiv.length).toBe(1);
    });

    test('should render with dev mode', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'true' },
        }));

        const { container } = render(<ProgressIndicator {...DEFAULT_PROPS} />);
        const parentDiv = container.getElementsByClassName('slider');
        const childDiv = container.getElementsByClassName('progressStyle');
        expect(parentDiv.length).toBe(1);
        expect(childDiv.length).toBe(1);
    });
});
