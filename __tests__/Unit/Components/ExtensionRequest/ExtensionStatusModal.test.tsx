import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import {
    ExtensionStatusModal,
    formatToRelativeTime,
} from '@/components/ExtensionRequest/ExtensionStatusModal';
import { useGetSelfExtensionRequestsQuery } from '@/app/services/tasksApi';
import { mockExtensionRequests } from '../../../../__mocks__/db/extensionRequests';

jest.mock(
    '@/app/services/tasksApi',
    () => ({
        useGetSelfExtensionRequestsQuery: jest.fn(),
    }),
    { virtual: true }
);

const mockQuery = useGetSelfExtensionRequestsQuery as jest.Mock;
const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    taskId: '123',
    dev: true,
    assignee: 'john',
};

const setupTest = (queryReturnValue: any) => {
    mockQuery.mockReturnValue(queryReturnValue);
    return render(<ExtensionStatusModal {...defaultProps} />);
};

describe.skip('ExtensionStatusModal Component', () => {
    test('should render loading state correctly', () => {
        setupTest({ isLoading: true, data: null });
        expect(screen.getByTestId('modal-title')).toBeInTheDocument();
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('should hide request extension button when pending request exists', () => {
        setupTest({
            isLoading: false,
            data: { allExtensionRequests: [{ id: 1, status: 'PENDING' }] },
        });
        expect(
            screen.queryByTestId('request-extension-button')
        ).not.toBeInTheDocument();
    });

    test('should handle modal interactions correctly', () => {
        setupTest({ isLoading: false, data: { allExtensionRequests: [] } });

        fireEvent.click(screen.getByTestId('close-button'));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

        jest.clearAllMocks();
        fireEvent.click(screen.getByTestId('extension-modal-overlay'));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

        jest.clearAllMocks();
        fireEvent.click(screen.getByTestId('extension-modal-content'));
        expect(defaultProps.onClose).not.toHaveBeenCalled();

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

        jest.clearAllMocks();
        fireEvent.keyDown(document, { key: 'Enter' });
        expect(defaultProps.onClose).not.toHaveBeenCalled();
    });
    test('should render close button correctly', () => {
        setupTest({ isLoading: false, data: { allExtensionRequests: [] } });

        const closeButton = screen.getByTestId('close-button');
        expect(closeButton).toBeInTheDocument();
        expect(closeButton).toBeVisible();
        expect(closeButton).toHaveTextContent('Close');
    });

    test('should show request extension button when no pending requests', () => {
        setupTest({
            isLoading: false,
            data: {
                allExtensionRequests: [
                    { id: 1, status: 'APPROVED', reviewedBy: 'Admin' },
                ],
            },
        });
        expect(
            screen.getByTestId('request-extension-button')
        ).toBeInTheDocument();
    });

    test('should handle timestamp conversion for large timestamps', () => {
        const approvedRequest = mockExtensionRequests.find(
            (req) => req.status === 'APPROVED'
        );

        setupTest({
            isLoading: false,
            data: {
                allExtensionRequests: [approvedRequest],
            },
        });
        expect(screen.getByTestId('modal-title')).toBeInTheDocument();
    });

    test('should handle denied status class', () => {
        const deniedRequest = mockExtensionRequests.find(
            (req) => req.status === 'DENIED'
        );

        setupTest({
            isLoading: false,
            data: {
                allExtensionRequests: [deniedRequest],
            },
        });
        expect(screen.getByTestId('modal-title')).toBeInTheDocument();
    });

    test('should test formatToRelativeTime function', () => {
        const timestamp = 1640995200;
        const result = formatToRelativeTime(timestamp);
        expect(typeof result).toBe('string');
    });
});
