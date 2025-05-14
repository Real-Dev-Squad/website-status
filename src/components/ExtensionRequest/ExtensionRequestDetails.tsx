import React from 'react';
import { ExtensionRequest } from '@/components/ExtensionRequest/ExtensionStatusModal';

interface ExtensionRequestDetailsProps {
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
}

export const ExtensionRequestDetails: React.FC<ExtensionRequestDetailsProps> =
    ({ extensionRequests, styles, getExtensionRequestDetails }) => {
        if (!extensionRequests || extensionRequests.length === 0) {
            return (
                <div
                    className={styles.extensionNoRequests}
                    data-testid="no-requests-message"
                >
                    No extension requests found for this task
                </div>
            );
        }

        return (
            <div>
                {extensionRequests.map((request) => (
                    <div
                        key={request.id}
                        className={styles.extensionRequest}
                        data-testid={`extension-request-${request.requestNumber}`}
                    >
                        {getExtensionRequestDetails(request, styles).map(
                            (detail, index) => (
                                <div
                                    key={index}
                                    className={styles.extensionDetailRow}
                                    data-testid={`detail-row-${index}`}
                                >
                                    <span
                                        className={styles.extensionLabel}
                                        data-testid={`label-${detail.testId}`}
                                    >
                                        {detail.label}
                                    </span>
                                    <span
                                        className={`${styles.extensionValue} ${
                                            detail.className || ''
                                        }`}
                                        data-testid={`value-${detail.testId}`}
                                    >
                                        {detail.value}
                                    </span>
                                </div>
                            )
                        )}

                        {request.status === 'APPROVED' &&
                            request.reviewedBy &&
                            request.reviewedAt && (
                                <div
                                    className={styles.extensionApprovalInfo}
                                    data-testid="approval-info"
                                >
                                    Your request was approved by{' '}
                                    {request.reviewedBy}{' '}
                                    {formatToRelativeTime(request.reviewedAt)}
                                </div>
                            )}

                        {request.status === 'DENIED' &&
                            request.reviewedBy &&
                            request.reviewedAt && (
                                <div
                                    className={styles.extensionRejectionInfo}
                                    data-testid="denied-info"
                                >
                                    Your request was denied by{' '}
                                    {request.reviewedBy}{' '}
                                    {formatToRelativeTime(request.reviewedAt)}
                                </div>
                            )}
                    </div>
                ))}
            </div>
        );
    };

export const formatToRelativeTime = (timestamp: number): string => {
    return 'some time ago';
};
