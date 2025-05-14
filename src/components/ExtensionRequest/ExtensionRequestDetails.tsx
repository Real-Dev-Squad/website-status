import React from 'react';
import { formatToRelativeTime } from './ExtensionStatusModal';

type ExtensionRequestDetailsProps = {
    extensionRequests: any[];
    styles: any;
    getExtensionRequestDetails: (request: any, styles: any) => any[];
};

export const ExtensionRequestDetails: React.FC<ExtensionRequestDetailsProps> =
    ({ extensionRequests, styles, getExtensionRequestDetails }) => {
        if (extensionRequests.length === 0) {
            return (
                <div
                    className={styles.extensionNoRequests}
                    data-testid="no-requests-message"
                >
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
                        className={styles.extensionExtensionRequest}
                        data-testid={`extension-request-${request.id}`}
                    >
                        {getExtensionRequestDetails(request, styles).map(
                            (item, idx) => (
                                <div
                                    key={idx}
                                    className={styles.extensionDetailRow}
                                    data-testid={`detail-row-${idx}`}
                                >
                                    <span
                                        className={styles.extensionLabel}
                                        data-testid={`label-${item.testId}`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`${styles.extensionValue} ${
                                            item.className || ''
                                        }`}
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
                                    className={
                                        request.status === 'APPROVED'
                                            ? styles.extensionApprovalInfo
                                            : styles.extensionRejectionInfo
                                    }
                                    data-testid={
                                        request.status === 'APPROVED'
                                            ? 'approval-info'
                                            : 'denied-info'
                                    }
                                >
                                    Your request was{' '}
                                    {request.status.toLowerCase()} by{' '}
                                    {request.reviewedBy}{' '}
                                    {request.reviewedAt
                                        ? formatToRelativeTime(
                                              request.reviewedAt
                                          )
                                        : ''}
                                </div>
                            )}
                    </div>
                ))}
            </>
        );
    };
