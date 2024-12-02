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
        (useRouter as jest.Mock).mockReturnValue({
            query: {
                dev: 'true',
            },
        });
    });

    test('should render Progress update Text in dev mode', () => {
        render(<HandleProgressText isLoading={false} {...DefaultProps} />);
        const button = screen.getByText('UPDATE');
        fireEvent.click(button);

        expect(button).toBeInTheDocument();
        expect(DefaultProps.handleProgressUpdate).toHaveBeenCalled();
    });

    test('should render Progress update Text in production mode', () => {
        (useRouter as jest.Mock).mockReturnValue({
            query: {
                dev: 'false',
            },
        });

        render(<HandleProgressText isLoading={false} {...DefaultProps} />);
        const button = screen.getByText('UPDATE');
        fireEvent.click(button);

        expect(button).toBeInTheDocument();
        expect(DefaultProps.handleProgressUpdate).toHaveBeenCalled();
    });
});
