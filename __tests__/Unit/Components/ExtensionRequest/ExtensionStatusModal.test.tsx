import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ExtensionStatusModal } from '@/components/ExtensionRequest/ExtensionStatusModal';
import { mockExtensionRequests } from '../../../../__mocks__/db/extensionRequests';
import { ExtensionRequest } from '@/components/ExtensionRequest/ExtensionStatusModal';

const useGetSelfExtensionRequestsQuery = jest.fn();
jest.mock('@/components/ExtensionRequest/ExtensionRequestDetails', () => ({
    ExtensionRequestDetails: ({
        extensionRequests,
        styles,
        getExtensionRequestDetails,
    }: {
        extensionRequests: ExtensionRequest[];
        styles: Record<string, string>;
        getExtensionRequestDetails: (
            request: ExtensionRequest,
            styles: Record<string, string>
        ) => Array<{
            label: string;
            value: string;
            testId: string;
            className?: string;
        }>;
    }) =>
        extensionRequests.length === 0 ? (
            <div data-testid="no-requests-message">
                <p>
                    No extension requests found for this task, want to create
                    one?
                </p>
            </div>
        ) : (
            <>
                {extensionRequests.map((request) => (
                    <div
                        key={request.id}
                        data-testid={`extension-request-${request.id}`}
                    >
                        {getExtensionRequestDetails(request, styles).map(
                            (item: any, idx: number) => (
                                <div
                                    key={idx}
                                    data-testid={`detail-row-${idx}`}
                                >
                                    <span data-testid={`label-${item.testId}`}>
                                        {item.label}
                                    </span>
                                    <span
                                        className={item.className || ''}
                                        data-testid={`value-${item.testId}`}
                                    >
                                        {item.value}
                                    </span>
                                </div>
                            )
                        )}
                        {request.reviewedBy &&
                            ['APPROVED', 'DENIED'].includes(request.status) && (
                                <div
                                    data-testid={
                                        request.status === 'APPROVED'
                                            ? 'approval-info'
                                            : 'denied-info'
                                    }
                                >
                                    Your request was{' '}
                                    {request.status.toLowerCase()} by{' '}
                                    {request.reviewedBy}
                                </div>
                            )}
                    </div>
                ))}
            </>
        ),
}));

jest.mock('moment', () => {
    const actualMoment = jest.requireActual('moment');
    return (timestamp: number | Date) => {
        if (timestamp instanceof Date || typeof timestamp === 'number') {
            return {
                format: jest.fn().mockImplementation((format) => {
                    switch (timestamp) {
                        case 1619090400000:
                            return '04/22/2021, 12:00:00 AM';
                        case 1714611746000:
                            return '05/02/2024, 2:02:26 PM';
                        default:
                            return actualMoment(timestamp).format(format);
                    }
                }),
                fromNow: jest.fn().mockReturnValue('some time ago'),
            };
        }
        return actualMoment(timestamp);
    };
});

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
    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    test('should render loading state correctly', () => {
        setupTest({ isLoading: true, data: null });
        expect(screen.getByTestId('modal-title')).toBeInTheDocument();
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('should pass data correctly to ExtensionRequestDetails component', () => {
        setupTest({
            isLoading: false,
            data: { allExtensionRequests: mockExtensionRequests },
        });
        expect(screen.getByTestId('extension-request-1')).toBeInTheDocument();
        expect(screen.getByTestId('extension-request-2')).toBeInTheDocument();
    });

    test('should render empty state correctly', () => {
        setupTest({ isLoading: false, data: { allExtensionRequests: [] } });
        expect(screen.getByTestId('no-requests-message')).toBeInTheDocument();
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
});
