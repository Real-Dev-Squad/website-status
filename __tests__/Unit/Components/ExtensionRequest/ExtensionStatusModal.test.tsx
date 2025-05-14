import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { ExtensionStatusModal } from '@/components/ExtensionRequest/ExtensionStatusModal';
import { ExtensionRequest } from '@/components/ExtensionRequest/ExtensionStatusModal';

const useGetSelfExtensionRequestsQuery = jest.fn();
interface ExtensionRequestDetail {
    testId: string;
    label: string;
    value: string | number;
    className?: string;
}

jest.mock('@/components/ExtensionRequest/ExtensionRequestDetails', () => ({
    ExtensionRequestDetails: ({
        extensionRequests,
        styles,
        getExtensionRequestDetails,
    }: {
        extensionRequests: ExtensionRequest[];
        styles: any;
        getExtensionRequestDetails: any;
    }) => {
        if (extensionRequests.length === 0) {
            return (
                <div data-testid="no-requests-message">
                    <p>
                        No extension requests found for this task, want to
                        create one?
                    </p>
                </div>
            );
        }

        return (
            <>
                {extensionRequests.map((request) => (
                    <div
                        key={request.id}
                        data-testid={`extension-request-${request.id}`}
                    >
                        {getExtensionRequestDetails(request, styles).map(
                            (item: ExtensionRequestDetail, idx: number) => (
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
                            (request.status === 'APPROVED' ||
                                request.status === 'DENIED') && (
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
        );
    },
}));

jest.mock('moment', () => {
    const mockedMoment = jest.requireActual('moment');
    return (timestamp: any) => {
        if (timestamp instanceof Date || typeof timestamp === 'number') {
            return {
                format: jest.fn().mockImplementation((format) => {
                    if (typeof timestamp === 'number') {
                        if (Math.abs(timestamp - 1619090400000) < 1000)
                            return '04/22/2021, 12:00:00 AM';
                        if (Math.abs(timestamp - 1714611746000) < 1000)
                            return '05/02/2024, 2:02:26 PM';
                    }
                    return mockedMoment(timestamp).format(format);
                }),
                fromNow: jest.fn().mockImplementation(() => {
                    if (Math.abs(Number(timestamp) - Date.now()) < 60000)
                        return 'a few seconds ago';
                    if (
                        Math.abs(
                            Number(timestamp) - (Date.now() - 5 * 60 * 1000)
                        ) < 60000
                    )
                        return '5 minutes ago';
                    if (
                        Math.abs(
                            Number(timestamp) -
                                (Date.now() - 3 * 60 * 60 * 1000)
                        ) < 60000
                    )
                        return '3 hours ago';
                    if (
                        Math.abs(
                            Number(timestamp) -
                                (Date.now() - 2 * 24 * 60 * 60 * 1000)
                        ) < 60000
                    )
                        return '2 days ago';
                    if (
                        Math.abs(
                            Number(timestamp) -
                                (Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
                        ) < 60000
                    )
                        return '3 months ago';
                    return 'some time ago';
                }),
            };
        }
        return mockedMoment(timestamp);
    };
});

interface QueryResult {
    isLoading: boolean;
    data?: { allExtensionRequests: ExtensionRequest[] } | null;
    error?: any;
    isError?: boolean;
}

jest.mock(
    '@/app/services/tasksApi',
    () => ({ useGetSelfExtensionRequestsQuery: jest.fn() }),
    { virtual: true }
);

const mockQuery = useGetSelfExtensionRequestsQuery as jest.Mock;

describe.skip('ExtensionStatusModal Component', () => {
    const now = Date.now();
    const mockExtensionRequests: ExtensionRequest[] = [
        {
            id: '1',
            reason: 'Need more time',
            newEndsOn: now + 86400000,
            title: 'Fix bugs',
            taskId: '123',
            oldEndsOn: now,
            status: 'APPROVED',
            requestNumber: 1,
            timestamp: now,
            assignee: 'john',
            assigneeId: 'user-1',
            reviewedBy: 'admin',
            reviewedAt: Math.floor(now / 1000),
        },
        {
            id: '2',
            reason: 'Additional requirements',
            newEndsOn: now + 172800000,
            title: 'Add features',
            taskId: '123',
            oldEndsOn: now - 86400000,
            status: 'PENDING',
            requestNumber: 2,
            timestamp: now - 43200000,
            assignee: 'john',
            assigneeId: 'user-1',
        },
    ];

    const defaultProps = {
        isOpen: true,
        onClose: jest.fn(),
        taskId: '123',
        dev: true,
        assignee: 'john',
    };

    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    const setupTest = (queryReturnValue: QueryResult) => {
        mockQuery.mockReturnValue(queryReturnValue);
        return render(<ExtensionStatusModal {...defaultProps} />);
    };

    test('renders loading state correctly', () => {
        setupTest({ isLoading: true, data: null });
        expect(screen.getByTestId('modal-title')).toBeInTheDocument();
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('passes data correctly to ExtensionRequestDetails component', () => {
        setupTest({
            isLoading: false,
            data: { allExtensionRequests: mockExtensionRequests },
        });

        expect(screen.getByTestId('extension-request-1')).toBeInTheDocument();
        expect(screen.getByTestId('extension-request-2')).toBeInTheDocument();
    });

    test('renders empty state correctly', () => {
        setupTest({ isLoading: false, data: { allExtensionRequests: [] } });
        expect(screen.getByTestId('no-requests-message')).toBeInTheDocument();
    });

    test('hides request extension button when pending request exists', () => {
        setupTest({
            isLoading: false,
            data: { allExtensionRequests: mockExtensionRequests },
        });
        expect(
            screen.queryByTestId('request-extension-button')
        ).not.toBeInTheDocument();
    });

    test('shows request extension button when no pending request exists', () => {
        setupTest({
            isLoading: false,
            data: {
                allExtensionRequests: [mockExtensionRequests[0]],
            },
        });
        expect(
            screen.getByTestId('request-extension-button')
        ).toBeInTheDocument();
    });

    test('handles modal interactions correctly', () => {
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

    test('renders nothing when modal is closed', () => {
        const { container } = render(
            <ExtensionStatusModal {...defaultProps} isOpen={false} />
        );
        expect(container.firstChild).toBeNull();
        expect(mockQuery).toHaveBeenCalledWith(
            { taskId: '123', dev: true },
            { skip: true }
        );
    });

    test('makes API call correctly when modal is open', () => {
        setupTest({ isLoading: false, data: { allExtensionRequests: [] } });
        expect(mockQuery).toHaveBeenCalledWith(
            { taskId: '123', dev: true },
            { skip: false }
        );
    });
});
