import ProgressIndicator from '@/components/tasks/card/ProgressIndicator';
import { render } from '@testing-library/react';

const DEFAULT_PROPS = {
    percentCompleted: 50,
    startedOn: '10 july 2023',
    endsOn: '14 July 2023',
};

describe('Progress Indicator', () => {
    test('should render the ProgressIndicator', () => {
        const { container } = render(<ProgressIndicator {...DEFAULT_PROPS} />);
        console.log('container', container);
        const parentDiv = container.getElementsByClassName('progressIndicator');
        const childDiv = container.getElementsByClassName('progressStyle');
        expect(parentDiv.length).toBe(1);
        expect(childDiv.length).toBe(1);
    });
});
