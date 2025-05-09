import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ExtensionStatusModal } from '@/components/Modal/ExtensionStatusModal';
import { ExtensionRequest } from '@/components/Modal/ExtensionStatusModal';

interface QueryResult {
    isLoading: boolean;
    data?: { allExtensionRequests: ExtensionRequest[] } | null;
    error?: any;
    isError?: boolean;
}

const useGetSelfExtensionRequestsQuery = jest.fn();

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskId: string;
    dev: boolean;
    assignee: string;
}

jest.mock(
    '@/app/services/tasksApi',
    () => ({
        useGetSelfExtensionRequestsQuery: jest.fn(),
    }),
    { virtual: true }
);

const mockQuery = useGetSelfExtensionRequestsQuery as jest.Mock;

describe.skip('ExtensionStatusModal Component', () => {
    const mockExtensionRequests: ExtensionRequest[] = [
        {
            id: '1',
            reason: 'Need more time',
            newEndsOn: Date.now() + 86400000,
            title: 'Fix bugs',
            taskId: '123',
            oldEndsOn: Date.now(),
            status: 'APPROVED',
            requestNumber: 1,
            timestamp: Date.now(),
            assignee: 'john',
            assigneeId: 'user-1',
            reviewedBy: 'admin',
            reviewedAt: Math.floor(Date.now() / 1000),
        },
        {
            id: '2',
            reason: 'Additional requirements',
            newEndsOn: Date.now() + 172800000,
            title: 'Add features',
            taskId: '123',
            oldEndsOn: Date.now() - 86400000,
            status: 'PENDING',
            requestNumber: 2,
            timestamp: Date.now() - 43200000,
            assignee: 'john',
            assigneeId: 'user-1',
        },
    ];

    const defaultProps: ModalProps = {
        isOpen: true,
        onClose: jest.fn(),
        taskId: '123',
        dev: true,
        assignee: 'john',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const setupTest = (queryReturnValue: QueryResult) => {
        mockQuery.mockReturnValue(queryReturnValue);
        return render(<ExtensionStatusModal {...defaultProps} />);
    };

    test('renders different states correctly', () => {
        setupTest({ isLoading: true, data: null });
        expect(screen.getByText('Extension Details')).toBeInTheDocument();

        setupTest({
            isLoading: false,
            data: null,
            error: { status: 500 },
            isError: true,
        });
        expect(
            screen.getByText('Error loading extension requests')
        ).toBeInTheDocument();

        setupTest({ isLoading: false, data: { allExtensionRequests: [] } });
        expect(
            screen.getByText(
                'No extension requests found for this task, want to create one?'
            )
        ).toBeInTheDocument();
    });

    test('renders extension requests correctly', () => {
        setupTest({
            isLoading: false,
            data: { allExtensionRequests: [mockExtensionRequests[0]] },
        });

        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByText('Need more time')).toBeInTheDocument();
        expect(screen.getByText('Fix bugs')).toBeInTheDocument();
        expect(screen.getByText('APPROVED')).toBeInTheDocument();
        expect(
            screen.getByText(/Your request was approved by admin/)
        ).toBeInTheDocument();

        expect(screen.getByText('Request Extension')).toBeInTheDocument();
    });

    test('hides request extension button when pending request exists', () => {
        setupTest({
            isLoading: false,
            data: { allExtensionRequests: mockExtensionRequests },
        });
        expect(screen.queryByText('Request Extension')).not.toBeInTheDocument();
    });

    test('handles modal interactions correctly', () => {
        const { container } = setupTest({
            isLoading: false,
            data: { allExtensionRequests: [] },
        });

        fireEvent.click(screen.getByText('Close'));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

        jest.clearAllMocks();

        const overlay = container.firstChild as HTMLElement;
        fireEvent.click(overlay);
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);

        jest.clearAllMocks();
        const modalContent = screen
            .getByText('Extension Details')
            .closest('div');
        if (modalContent) fireEvent.click(modalContent);
        expect(defaultProps.onClose).not.toHaveBeenCalled();
    });

    test('renders nothing when modal is closed', () => {
        const { container } = render(
            <ExtensionStatusModal {...defaultProps} isOpen={false} />
        );
        expect(container.firstChild).toBeNull();
    });

    test('applies correct CSS classes for different statuses', () => {
        setupTest({
            isLoading: false,
            data: { allExtensionRequests: [mockExtensionRequests[0]] },
        });
        const approvedStatus = screen.getByText('APPROVED');
        expect(approvedStatus).toHaveClass('extensionValue');
        expect(approvedStatus).toHaveClass('extensionApproved');

        setupTest({
            isLoading: false,
            data: { allExtensionRequests: [mockExtensionRequests[1]] },
        });
        const pendingStatus = screen.getByText('PENDING');
        expect(pendingStatus).toHaveClass('extensionValue');
        expect(pendingStatus).toHaveClass('extensionPending');
    });

    test('formats dates correctly', () => {
        const timestamp = new Date('2025-04-22T14:02:26').getTime();
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

        const dateElements = screen.getAllByText(
            (content) =>
                typeof content === 'string' && content.includes('4/22/2025')
        );
        expect(dateElements.length).toBeGreaterThan(0);
    });

    test('formats time ago correctly', () => {
        const now = Date.now();

        const timeFormats: [number, string][] = [
            [now - 10 * 1000, 'just now'],
            [now - 5 * 60 * 1000, '5 minutes ago'],
            [now - 3 * 60 * 60 * 1000, '3 hours ago'],
            [now - 2 * 24 * 60 * 60 * 1000, '2 days ago'],
            [now - 3 * 30 * 24 * 60 * 60 * 1000, '3 months ago'],
        ];

        timeFormats.forEach(([timeAgo, expectedText]) => {
            setupTest({
                isLoading: false,
                data: {
                    allExtensionRequests: [
                        {
                            ...mockExtensionRequests[0],
                            reviewedAt: Math.floor(timeAgo / 1000),
                        },
                    ],
                },
            });

            expect(
                screen.getByText(
                    new RegExp(
                        `Your request was approved by admin ${expectedText}`
                    )
                )
            ).toBeInTheDocument();
        });
    });

    test('handles different timestamp formats', () => {
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

        const dateElements = screen.getAllByText(/4\/22\/2021/);
        expect(dateElements).toHaveLength(2);
    });

    test('skips API call when modal is closed', () => {
        render(<ExtensionStatusModal {...defaultProps} isOpen={false} />);
        expect(mockQuery).toHaveBeenCalledWith(
            { taskId: '123', dev: true },
            { skip: true }
        );

        setupTest({ isLoading: true });
        expect(mockQuery).toHaveBeenCalledWith(
            { taskId: '123', dev: true },
            { skip: false }
        );
    });
});
