import HandleProgressText from '@/components/tasks/card/progressContainer/ProgressText';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const DefaultProps = {
    handleSaveProgressUpdate: jest.fn(),
    handleProgressUpdate: jest.fn(),
};

describe('ProgressText', () => {
    beforeEach(() => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'false' },
        }));
    });

    test('should render Progress update Text', () => {
        const { getByText } = render(
            <HandleProgressText isLoading={false} {...DefaultProps} />
        );
        fireEvent.click(screen.getByText('UPDATE'));
        expect(getByText('UPDATE')).toBeInTheDocument();
    });

    test('should render Progress update Text in dev mode', () => {
        (useRouter as jest.Mock).mockImplementation(() => ({
            query: { dev: 'true' },
        }));

        const { getByText } = render(
            <HandleProgressText isLoading={false} {...DefaultProps} />
        );
        const updateButton = getByText('UPDATE');
        expect(updateButton).toBeInTheDocument();
        expect(updateButton.className).toContain('changeProgressTextUpdated');
        fireEvent.click(updateButton);
        expect(DefaultProps.handleProgressUpdate).toHaveBeenCalled();
    });

    test('should render loader when loading', () => {
        render(<HandleProgressText isLoading={true} {...DefaultProps} />);
        expect(screen.queryByText('UPDATE')).not.toBeInTheDocument();
    });
});
