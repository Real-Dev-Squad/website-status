import HandleProgressText from '@/components/tasks/card/ProgressText';
import { fireEvent, render, screen } from '@testing-library/react';

const DefaultProps = {
    handleSaveProgressUpdate: jest.fn(),
    handleProgressUpdate: jest.fn(),
};

describe('ProgressText', () => {
    test('should render save Progress Text', () => {
        const progress = true;
        const { getByText } = render(
            <HandleProgressText progress={progress} {...DefaultProps} />
        );
        fireEvent.click(screen.getByText('save Progress'));
        expect(getByText('save Progress')).toBeInTheDocument();
    });
    test('should render Progress update Text', () => {
        const progress = false;
        const { getByText } = render(
            <HandleProgressText progress={progress} {...DefaultProps} />
        );
        fireEvent.click(screen.getByText('Progress update'));
        expect(getByText('Progress update')).toBeInTheDocument();
    });
});
