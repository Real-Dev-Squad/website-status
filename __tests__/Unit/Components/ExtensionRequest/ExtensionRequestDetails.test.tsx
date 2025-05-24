import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExtensionRequestDetails } from '@/components/ExtensionRequest/ExtensionRequestDetails';
import { mockExtensionRequests } from '../../../../__mocks__/db/extensionRequests';

jest.mock('@/components/ExtensionRequest/ExtensionStatusModal', () => ({
    formatToRelativeTime: jest.fn((timestamp) => {
        if (Math.floor(timestamp) === 1619090400) return 'a month ago';
        if (Math.floor(timestamp) === 1714611746) return '5 minutes ago';
        return 'some time ago';
    }),
}));

describe.skip('ExtensionRequestDetails Component', () => {
    const mockStyles = {
        extensionNoRequests: 'extensionNoRequests',
        extensionExtensionRequest: 'extensionExtensionRequest',
        extensionDetailRow: 'extensionDetailRow',
        extensionLabel: 'extensionLabel',
        extensionValue: 'extensionValue',
        extensionApproved: 'extensionApproved',
        extensionDenied: 'extensionDenied',
        extensionPending: 'extensionPending',
        extensionApprovalInfo: 'extensionApprovalInfo',
        extensionRejectionInfo: 'extensionRejectionInfo',
    };

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
                extensionRequests={[mockExtensionRequests[2]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );
        expect(screen.getByTestId('extension-request-3')).toBeInTheDocument();
        expect(screen.getByTestId('value-request-number')).toHaveTextContent(
            '#3'
        );
        expect(screen.getByTestId('value-request-reason')).toHaveTextContent(
            'Need more time'
        );
        expect(screen.getByTestId('value-request-status')).toHaveTextContent(
            'APPROVED'
        );
        expect(getExtensionRequestDetails).toHaveBeenCalledWith(
            mockExtensionRequests[2],
            mockStyles
        );
    });

    test('renders approval info for approved requests', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[mockExtensionRequests[2]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );
        const approvalInfo = screen.getByTestId('approval-info');
        expect(approvalInfo).toBeInTheDocument();
        expect(approvalInfo.textContent).toContain(
            'Your request was approved by admin'
        );
        expect(approvalInfo).toHaveClass('extensionApprovalInfo');
    });

    test('renders denial info for denied requests', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[mockExtensionRequests[3]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );
        const denialInfo = screen.getByTestId('denied-info');
        expect(denialInfo).toBeInTheDocument();
        expect(denialInfo.textContent).toContain(
            'Your request was denied by manager'
        );
        expect(denialInfo).toHaveClass('extensionRejectionInfo');
    });

    test('does not render review info for pending requests', () => {
        render(
            <ExtensionRequestDetails
                extensionRequests={[mockExtensionRequests[4]]}
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
                extensionRequests={[mockExtensionRequests[2]]}
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
                extensionRequests={[mockExtensionRequests[2]]}
                styles={mockStyles}
                getExtensionRequestDetails={getExtensionRequestDetails}
            />
        );
        expect(screen.getByTestId('value-request-status')).toHaveClass(
            'extensionApproved'
        );
    });
});
