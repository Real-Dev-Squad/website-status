import HandleProgressText from '@/components/tasks/card/ProgressText';
import { fireEvent, render, screen } from '@testing-library/react';

const DefaultProps = {
    handleSaveProgressUpdate: jest.fn(),
    handleProgressUpdate: jest.fn(),
};

describe('ProgressText', () => {
    test('should render save Progress Text', async () => {
        const progress = true;
        const { getByText } = render(
            <>
                <HandleProgressText
                    progress={progress}
                    loading={false}
                    {...DefaultProps}
                />
            </>
        );
        fireEvent.click(screen.getByText('SAVE'));
        expect(getByText('SAVE')).toBeInTheDocument();
    });
    test('should render Progress update Text', () => {
        const progress = false;
        const { getByText } = render(
            <HandleProgressText
                progress={progress}
                loading={false}
                {...DefaultProps}
            />
        );
        fireEvent.click(screen.getByText('UPDATE'));
        expect(getByText('UPDATE')).toBeInTheDocument();
    });
});
