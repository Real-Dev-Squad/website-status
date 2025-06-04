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
    test('should render all fields correctly', () => {
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

    test(' should handle input change correctly', () => {
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

    test('should disable submit button if newEndsOn <= oldEndsOn', () => {
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
        const mockEta = '2025-12-31T18:29';
        const mockEtaTimestampInSeconds = Math.floor(
            new Date(mockEta).getTime() / 1000
        );

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

        fireEvent.change(screen.getByTestId('new-eta-input'), {
            target: { value: mockEta, name: 'newEndsOn' },
        });

        fireEvent.submit(screen.getByTestId('extension-form'));

        await waitFor(() => {
            expect(mockCreateExtensionRequest).toHaveBeenCalledTimes(1);
            expect(mockCreateExtensionRequest).toHaveBeenCalledWith(
                expect.objectContaining({
                    reason: 'Valid reason',
                    title: 'Valid title',
                    taskId: '123',
                    assignee: 'john',
                    newEndsOn: mockEtaTimestampInSeconds,
                })
            );
        });
    });

    test('should not render the form when isOpen is false', () => {
        render(<ExtensionRequestForm {...defaultProps} isOpen={false} />);
        expect(
            screen.queryByTestId('extension-form-modal')
        ).not.toBeInTheDocument();
    });

    test('should call onClose when cancel button clicked', () => {
        render(<ExtensionRequestForm {...defaultProps} />);
        fireEvent.click(screen.getByTestId('cancel-button'));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    test('should show toast error on submit failure', async () => {
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
    test('should show toast success on successful form submission', async () => {
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
        fireEvent.change(screen.getByTestId('new-eta-input'), {
            target: { value: '2025-12-31T18:29', name: 'newEndsOn' },
        });

        fireEvent.submit(screen.getByTestId('extension-form'));

        await waitFor(() => {
            expect(toast).toHaveBeenCalledWith('SUCCESS', expect.any(String));
            expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
        });
    });
    test('should handle new ETA date input change correctly', () => {
        const oldEndsOn = new Date('2025-01-01T10:00:00').getTime();

        render(
            <ExtensionRequestForm {...defaultProps} oldEndsOn={oldEndsOn} />
        );

        const newEtaInput = screen.getByTestId('new-eta-input');
        const testDate = '2025-02-01T12:00';

        fireEvent.change(newEtaInput, {
            target: {
                name: 'newEndsOn',
                value: testDate,
            },
        });

        expect((newEtaInput as HTMLInputElement).value).toContain('2025-02-01');
        expect(screen.queryByTestId('eta-error')).not.toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeEnabled();
    });
});
