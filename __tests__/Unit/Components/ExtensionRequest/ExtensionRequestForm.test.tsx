import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExtensionRequestForm } from '@/components/ExtensionRequest/ExtensionRequestForm';
import { toast } from '@/helperFunctions/toast';

const mockCreateExtensionRequest = jest.fn();

jest.mock('@/app/services/tasksApi', () => ({
    useCreateExtensionRequestMutation: () => [
        mockCreateExtensionRequest,
        { isLoading: false },
    ],
}));

jest.mock('@/helperFunctions/toast', () => ({
    toast: jest.fn(),
    ToastTypes: {
        SUCCESS: 'SUCCESS',
        ERROR: 'ERROR',
    },
}));

const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    taskId: '123',
    assignee: 'john',
    oldEndsOn: new Date().getTime(),
};

describe('ExtensionRequestForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders all fields correctly', () => {
        render(<ExtensionRequestForm {...defaultProps} />);

        expect(screen.getByTestId('extension-form-modal')).toBeInTheDocument();
        expect(screen.getByTestId('form-heading')).toHaveTextContent(
            'Extension Request Form'
        );
        expect(screen.getByTestId('reason-input')).toBeInTheDocument();
        expect(screen.getByTestId('new-eta-input')).toBeInTheDocument();
        expect(screen.getByTestId('title-input')).toBeInTheDocument();
        expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
    });

    test('handles input change correctly', () => {
        render(<ExtensionRequestForm {...defaultProps} />);

        fireEvent.change(screen.getByTestId('reason-input'), {
            target: { value: 'Need more time', name: 'reason' },
        });
        fireEvent.change(screen.getByTestId('title-input'), {
            target: { value: 'Extension Title', name: 'title' },
        });

        expect(screen.getByTestId('reason-input')).toHaveValue(
            'Need more time'
        );
        expect(screen.getByTestId('title-input')).toHaveValue(
            'Extension Title'
        );
    });

    test('disables submit button if newEndsOn <= oldEndsOn', () => {
        render(
            <ExtensionRequestForm
                {...defaultProps}
                oldEndsOn={new Date('2025-01-01T10:00:00').getTime()}
            />
        );

        fireEvent.change(screen.getByTestId('new-eta-input'), {
            target: {
                name: 'newEndsOn',
                value: '2024-01-01T10:00',
            },
        });

        expect(screen.getByTestId('eta-error')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeDisabled();
    });

    test('submits form with correct data', async () => {
        mockCreateExtensionRequest.mockReturnValueOnce({
            unwrap: () => Promise.resolve(),
        });

        render(<ExtensionRequestForm {...defaultProps} />);

        fireEvent.change(screen.getByTestId('reason-input'), {
            target: { value: 'Valid reason', name: 'reason' },
        });
        fireEvent.change(screen.getByTestId('title-input'), {
            target: { value: 'Valid title', name: 'title' },
        });

        fireEvent.submit(screen.getByTestId('extension-form'));

        await waitFor(() => {
            expect(mockCreateExtensionRequest).toHaveBeenCalledTimes(1);
        });
    });

    test('does not render when isOpen is false', () => {
        render(<ExtensionRequestForm {...defaultProps} isOpen={false} />);
        expect(
            screen.queryByTestId('extension-form-modal')
        ).not.toBeInTheDocument();
    });

    test('calls onClose when cancel button clicked', () => {
        render(<ExtensionRequestForm {...defaultProps} />);
        fireEvent.click(screen.getByTestId('cancel-button'));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    test('shows toast error on submit failure', async () => {
        mockCreateExtensionRequest.mockReturnValueOnce({
            unwrap: () => Promise.reject(new Error('Error submitting')),
        });

        render(<ExtensionRequestForm {...defaultProps} />);

        fireEvent.change(screen.getByTestId('reason-input'), {
            target: { value: 'Valid reason', name: 'reason' },
        });
        fireEvent.change(screen.getByTestId('title-input'), {
            target: { value: 'Valid title', name: 'title' },
        });

        fireEvent.submit(screen.getByTestId('extension-form'));

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith('ERROR', expect.any(String));
        });
    });
});
