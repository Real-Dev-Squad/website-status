import HandleProgressText from '@/components/tasks/card/progressBar/ProgressText';
import { fireEvent, render, screen } from '@testing-library/react';

const DefaultProps = {
    handleSaveProgressUpdate: jest.fn(),
    handleProgressUpdate: jest.fn(),
};

describe('ProgressText', () => {
    test('should render Progress update Text', () => {
        const { getByText } = render(
            <HandleProgressText isLoading={false} {...DefaultProps} />
        );
        fireEvent.click(screen.getByText('UPDATE'));
        expect(getByText('UPDATE')).toBeInTheDocument();
    });
});
