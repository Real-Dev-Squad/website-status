import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { ExtensionStatusModal } from '@/components/Modal/ExtensionStatusModal';

import { ExtensionRequest } from '@/components/Modal/ExtensionStatusModal';

const useGetSelfExtensionRequestsQuery = jest.fn();

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

    test('renders loading state and empty state correctly', () => {
        setupTest({ isLoading: true, data: null });
        expect(screen.getByTestId('modal-title')).toBeInTheDocument();
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

        setupTest({ isLoading: false, data: { allExtensionRequests: [] } });
        expect(screen.getByTestId('no-requests-message')).toBeInTheDocument();
    });

    test('renders extension requests correctly', () => {
        setupTest({
            isLoading: false,
            data: { allExtensionRequests: [mockExtensionRequests[0]] },
        });

        expect(screen.getByTestId('value-request-number')).toHaveTextContent(
            '#1'
        );
        expect(screen.getByTestId('value-request-reason')).toHaveTextContent(
            'Need more time'
        );
        expect(screen.getByTestId('value-request-title')).toHaveTextContent(
            'Fix bugs'
        );
        expect(screen.getByTestId('value-request-status')).toHaveTextContent(
            'APPROVED'
        );
        expect(screen.getByTestId('approval-info')).toHaveTextContent(
            /Your request was approved by admin/
        );
        expect(
            screen.getByTestId('request-extension-button')
        ).toBeInTheDocument();
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

    test('applies correct CSS classes for APPROVED status', () => {
        setupTest({
            isLoading: false,
            data: { allExtensionRequests: [mockExtensionRequests[0]] },
        });
        const approvedStatus = screen.getByTestId('value-request-status');
        expect(approvedStatus).toHaveClass('extensionValue');
        expect(approvedStatus).toHaveClass('extensionApproved');
    });

    test('formats dates correctly using moment', () => {
        const timestamp = new Date('2024-05-02T14:02:26').getTime();
        setupTest({
            isLoading: false,
            data: {
                allExtensionRequests: [
                    {
                        ...mockExtensionRequests[0],
                        oldEndsOn: timestamp,
                        newEndsOn: timestamp,
                    },
                ],
            },
        });

        expect(screen.getByTestId('value-old-ends-on')).toHaveTextContent(
            '05/02/2024, 2:02:26 PM'
        );
        expect(screen.getByTestId('value-new-ends-on')).toHaveTextContent(
            '05/02/2024, 2:02:26 PM'
        );
    });

    test.each([
        { timeAgo: 10 * 1000, expected: 'a few seconds ago' },
        { timeAgo: 5 * 60 * 1000, expected: '5 minutes ago' },
        { timeAgo: 3 * 60 * 60 * 1000, expected: '3 hours ago' },
        { timeAgo: 2 * 24 * 60 * 60 * 1000, expected: '2 days ago' },
        { timeAgo: 3 * 30 * 24 * 60 * 60 * 1000, expected: '3 months ago' },
    ])('formats time ago correctly: $expected', ({ timeAgo, expected }) => {
        const timestamp = now - timeAgo;
        setupTest({
            isLoading: false,
            data: {
                allExtensionRequests: [
                    {
                        ...mockExtensionRequests[0],
                        reviewedAt: Math.floor(timestamp / 1000),
                    },
                ],
            },
        });

        expect(screen.getByTestId('approval-info')).toHaveTextContent(
            new RegExp(`Your request was approved by admin ${expected}`)
        );
    });

    test('handles different timestamp formats with moment', () => {
        setupTest({
            isLoading: false,
            data: {
                allExtensionRequests: [
                    {
                        ...mockExtensionRequests[0],
                        oldEndsOn: 1619090400,
                        newEndsOn: 1619090400000,
                    },
                ],
            },
        });

        expect(screen.getByTestId('value-old-ends-on')).toHaveTextContent(
            '04/22/2021, 12:00:00 AM'
        );
        expect(screen.getByTestId('value-new-ends-on')).toHaveTextContent(
            '04/22/2021, 12:00:00 AM'
        );
    });
});
