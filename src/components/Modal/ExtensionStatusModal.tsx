import React, { useState, useEffect, useRef } from 'react';
import styles from './modal.module.scss';
import { useGetSelfExtensionRequestsQuery } from '@/app/services/tasksApi';
import { ExtensionRequestForm } from '@/components/Form/ExtensionRequestForm';

type ExtensionStatusModalProps = {
    isOpen: boolean;
    onClose: () => void;
    taskId: string;
    dev: boolean;
    assignee: string;
};

export const ExtensionStatusModal: React.FC<ExtensionStatusModalProps> = ({
    isOpen,
    onClose,
    taskId,
    dev,
    assignee,
}) => {
    const { data, isLoading, error } = useGetSelfExtensionRequestsQuery(
        { taskId, dev },
        { skip: !isOpen }
    );
    const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
    const [oldEndsOn, setOldEndsOn] = useState<number | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && (data?.allExtensionRequests ?? []).length > 0) {
            const latestRequest = [...(data?.allExtensionRequests ?? [])].sort(
                (a, b) => b.requestNumber - a.requestNumber
            )[0];
            setOldEndsOn(latestRequest.newEndsOn);
        } else if (isOpen) {
            setOldEndsOn(new Date().getTime());
        }
    }, [isOpen, data, taskId, dev]);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node))
            onClose();
    };

    const handleOpenRequestForm = () => {
        setIsRequestFormOpen(true);
        onClose();
    };

    const handleCloseRequestForm = () => setIsRequestFormOpen(false);

    const handleSubmitExtensionRequest = (formData: any) => {
        console.log('Complete request data:', { ...formData, taskId, dev });
        setIsRequestFormOpen(false);
    };

    const formatDate = (timestamp: number) => {
        const timestampMs =
            timestamp > 9999999999 ? timestamp : timestamp * 1000;
        const date = new Date(timestampMs);
        return `${
            date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}, ${date.toLocaleTimeString()}`;
    };

    const getStatusClass = (status: string) =>
        status === 'APPROVED'
            ? styles.extensionApproved
            : styles.extensionPending;

    const renderRequestForm = () => (
        <ExtensionRequestForm
            isOpen={isRequestFormOpen}
            onClose={handleCloseRequestForm}
            taskId={taskId}
            assignee={assignee}
            oldEndsOn={oldEndsOn}
        />
    );

    // Early returns
    if (!isOpen) return isRequestFormOpen ? renderRequestForm() : null;

    if (isLoading) {
        return (
            <div className={styles.extensionModalOverlay}>
                <div className={styles.extensionModal}>
                    <h2>Loading extension requests...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.extensionModalOverlay}>
                <div className={styles.extensionModal}>
                    <h2>Error loading extension requests</h2>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                    <button
                        className={styles.extensionCloseButton}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const hasPendingRequest = data?.allExtensionRequests?.some(
        (req) => req.status === 'PENDING'
    );

    return (
        <>
            <div
                className={styles.extensionModalOverlay}
                onClick={handleOutsideClick}
            >
                <div className={styles.extensionModal} ref={modalRef}>
                    <h2>Extension Details</h2>

                    {Array.isArray(data?.allExtensionRequests) &&
                    data.allExtensionRequests.length > 0 ? (
                        data.allExtensionRequests.map((request) => (
                            <div
                                key={request.id}
                                className={styles.extensionExtensionRequest}
                            >
                                {[
                                    {
                                        label: 'Request :',
                                        value: `#${request.requestNumber}`,
                                    },
                                    {
                                        label: 'Reason :',
                                        value: request.reason,
                                    },
                                    { label: 'Title :', value: request.title },
                                    {
                                        label: 'Old Ends On :',
                                        value: formatDate(request.oldEndsOn),
                                    },
                                    {
                                        label: 'New Ends On :',
                                        value: formatDate(request.newEndsOn),
                                    },
                                    {
                                        label: 'Status :',
                                        value: request.status,
                                        className: getStatusClass(
                                            request.status
                                        ),
                                    },
                                ].map((item, idx) => (
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
                                ))}

                                {request.reviewedBy && (
                                    <div
                                        className={styles.extensionApprovalInfo}
                                    >
                                        Your request was approved by{' '}
                                        {request.reviewedBy}{' '}
                                        {request.reviewedAt
                                            ? formatTimeAgo(
                                                  request.reviewedAt * 1000
                                              )
                                            : ''}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className={styles.extensionNoRequests}>
                            <p>No extension requests found for this task.</p>
                            <p>
                                If you need more time to complete this task, you
                                can request an extension.
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
                            <button
                                className={styles.extensionRequestButton}
                                onClick={handleOpenRequestForm}
                            >
                                Request Extension
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {renderRequestForm()}
        </>
    );
};

function formatTimeAgo(timestamp: number) {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'just now';
}
