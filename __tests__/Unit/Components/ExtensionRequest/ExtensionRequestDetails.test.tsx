import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExtensionRequestDetails } from '@/components/ExtensionRequest/ExtensionRequestDetails';
import { ExtensionRequest } from '@/components/ExtensionRequest/ExtensionStatusModal';

jest.mock('@/components/ExtensionRequest/ExtensionStatusModal', () => ({
    formatToRelativeTime: jest.fn((timestamp) => {
        if (Math.floor(timestamp) === 1619090400) return 'a month ago';
        if (Math.floor(timestamp) === 1714611746) return '5 minutes ago';
        return 'some time ago';
    }),
}));

describe.skip('ExtensionRequestDetails Component', () => {
    const now = Date.now();
    const mockStyles = {
        extensionNoRequests: 'extensionNoRequests',
        extensionRequest: 'extensionRequest',
        extensionDetailRow: 'extensionDetailRow',
        extensionLabel: 'extensionLabel',
        extensionValue: 'extensionValue',
        extensionApproved: 'extensionApproved',
        extensionDenied: 'extensionDenied',
        extensionPending: 'extensionPending',
        extensionApprovalInfo: 'extensionApprovalInfo',
        extensionRejectionInfo: 'extensionRejectionInfo',
    };

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
            reviewedAt: 1619090400,
        },
        {
            id: '2',
            reason: 'Additional requirements',
            newEndsOn: now + 172800000,
            title: 'Add features',
            taskId: '123',
            oldEndsOn: now - 86400000,
            status: 'DENIED',
            requestNumber: 2,
            timestamp: now - 43200000,
            assignee: 'john',
            assigneeId: 'user-1',
            reviewedBy: 'manager',
            reviewedAt: 1714611746,
        },
        {
            id: '3',
            reason: 'Task complexity increased',
            newEndsOn: now + 172800000,
            title: 'Implement new API',
            taskId: '123',
            oldEndsOn: now - 86400000,
            status: 'PENDING',
            requestNumber: 3,
            timestamp: now - 43200000,
            assignee: 'john',
            assigneeId: 'user-1',
        },
    ];

    const getExtensionRequestDetails = jest.fn((request, styles) => [
        {
            label: 'Request :',
            value: `#${request.requestNumber}`,
            testId: 'request-number',
        },
        {
            label: 'Reason :',
            value: request.reason,
            testId: 'request-reason',
        },
        {
            label: 'Status :',
            value: request.status,
            className:
                request.status === 'APPROVED'
                    ? styles.extensionApproved
                    : request.status === 'DENIED'
                    ? styles.extensionDenied
                    : styles.extensionPending,
            testId: 'request-status',
        },
    ]);

    test('renders no requests message when there are no extension requests', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );

        expect(screen.getByTestId('no-requests-message')).toBeInTheDocument();
        expect(
            screen.getByText(/No extension requests found for this task/i)
        ).toBeInTheDocument();
    });

    test('renders extension request details correctly', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[mockExtensionRequests[0]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );

        expect(screen.getByTestId('extension-request-1')).toBeInTheDocument();
        expect(screen.getByTestId('value-request-number')).toHaveTextContent(
            '#1'
        );
        expect(screen.getByTestId('value-request-reason')).toHaveTextContent(
            'Need more time'
        );
        expect(screen.getByTestId('value-request-status')).toHaveTextContent(
            'APPROVED'
        );
        expect(getExtensionRequestDetails).toHaveBeenCalledWith(
            mockExtensionRequests[0],
            mockStyles
        );
    });

    test('renders approval info for approved requests', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[mockExtensionRequests[0]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );

        expect(screen.getByTestId('approval-info')).toBeInTheDocument();
        expect(screen.getByTestId('approval-info')).toHaveTextContent(
            'Your request was approved by admin a month ago'
        );
        expect(screen.getByTestId('approval-info')).toHaveClass(
            'extensionApprovalInfo'
        );
    });

    test('renders denial info for denied requests', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[mockExtensionRequests[1]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );

        expect(screen.getByTestId('denied-info')).toBeInTheDocument();
        expect(screen.getByTestId('denied-info')).toHaveTextContent(
            'Your request was denied by manager 5 minutes ago'
        );
        expect(screen.getByTestId('denied-info')).toHaveClass(
            'extensionRejectionInfo'
        );
    });

    test('does not render review info for pending requests', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[mockExtensionRequests[2]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );

        expect(screen.queryByTestId('approval-info')).not.toBeInTheDocument();
        expect(screen.queryByTestId('denied-info')).not.toBeInTheDocument();
    });

    test('applies correct class names to detail rows', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[mockExtensionRequests[0]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );

        expect(screen.getAllByTestId(/detail-row-/)[0]).toHaveClass(
            'extensionDetailRow'
        );
        expect(screen.getByTestId('label-request-number')).toHaveClass(
            'extensionLabel'
        );
        expect(screen.getByTestId('value-request-number')).toHaveClass(
            'extensionValue'
        );
    });

    test('applies custom class names from getExtensionRequestDetails', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[mockExtensionRequests[0]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );

        expect(screen.getByTestId('value-request-status')).toHaveClass(
            'extensionApproved'
        );
    });
});
