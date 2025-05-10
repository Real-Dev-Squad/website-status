import React, { useRef, useEffect } from 'react';
import styles from './modal.module.scss';
import { useGetSelfExtensionRequestsQuery } from '@/app/services/tasksApi';
import { SmallSpinner } from '../tasks/card/SmallSpinner';
import moment from 'moment';

type ExtensionStatusModalProps = {
    isOpen: boolean;
    onClose: () => void;
    taskId: string;
    dev: boolean;
    assignee: string;
};

const formatToDateTime = (timestamp: number) => {
    const timestampMs = timestamp > 9999999999 ? timestamp : timestamp * 1000;
    return moment(timestampMs).format('MM/DD/YYYY, h:mm:ss A');
};

const formatToRelativeTime = (timestamp: number) => {
    const timestampMs = timestamp > 9999999999 ? timestamp : timestamp * 1000;
    return moment(timestampMs).fromNow();
};

const getStatusClass = (status: string, styles: any) =>
    status === 'APPROVED' ? styles.extensionApproved : styles.extensionPending;

const getExtensionRequestDetails = (request: any, styles: any) => [
    {
        label: 'Request :',
        value: `#${request.requestNumber}`,
    },
    {
        label: 'Reason :',
        value: request.reason,
    },
    {
        label: 'Title :',
        value: request.title,
    },
    {
        label: 'Old Ends On :',
        value: formatToDateTime(request.oldEndsOn),
    },
    {
        label: 'New Ends On :',
        value: formatToDateTime(request.newEndsOn),
    },
    {
        label: 'Status :',
        value: request.status,
        className: getStatusClass(request.status, styles),
    },
];

export function ExtensionStatusModal({
    isOpen,
    onClose,
    taskId,
    dev,
    assignee,
}: ExtensionStatusModalProps) {
    const { data, isLoading, error } = useGetSelfExtensionRequestsQuery(
        { taskId, dev },
        { skip: !isOpen }
    );
    const modalRef = useRef<HTMLDivElement>(null);

    const extensionRequests = data?.allExtensionRequests ?? [];
    const hasPendingRequest = extensionRequests.some(
        (req) => req.status === 'PENDING'
    );

    useEffect(() => {
        if (!isOpen) return;

        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isOpen, onClose]);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    if (isLoading) {
        return (
            <div className={styles.extensionModalOverlay}>
                <div className={styles.extensionModalLoading}>
                    <h2>Extension Details</h2>
                    <div className={styles.spinnerContainer}>
                        <SmallSpinner />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={styles.extensionModalOverlay}
            onClick={handleOutsideClick}
        >
            <div className={styles.extensionModal} ref={modalRef}>
                <h2>Extension Details</h2>

                {extensionRequests.length > 0 ? (
                    extensionRequests.map((request) => (
                        <div
                            key={request.id}
                            className={styles.extensionExtensionRequest}
                        >
                            {getExtensionRequestDetails(request, styles).map(
                                (item, idx) => (
                                    <div
                                        key={idx}
                                        className={styles.extensionDetailRow}
                                    >
                                        <span className={styles.extensionLabel}>
                                            {item.label}
                                        </span>
                                        <span
                                            className={`${
                                                styles.extensionValue
                                            } ${item.className || ''}`}
                                        >
                                            {item.value}
                                        </span>
                                    </div>
                                )
                            )}

                            {request.reviewedBy && (
                                <div className={styles.extensionApprovalInfo}>
                                    Your request was approved by{' '}
                                    {request.reviewedBy}{' '}
                                    {request.reviewedAt
                                        ? formatToRelativeTime(
                                              request.reviewedAt
                                          )
                                        : ''}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className={styles.extensionNoRequests}>
                        <p>
                            No extension requests found for this task, want to
                            create one?
                        </p>
                    </div>
                )}

                <div
                    className={styles.extensionButtonContainer}
                    style={{
                        justifyContent: hasPendingRequest
                            ? 'center'
                            : 'space-between',
                    }}
                >
                    <button
                        className={styles.extensionCloseButton}
                        onClick={onClose}
                    >
                        Close
                    </button>
                    {!hasPendingRequest && (
                        <button className={styles.extensionRequestButton}>
                            Request Extension
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
