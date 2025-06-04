import React, { useRef, useEffect, useState } from 'react';
import styles from './ExtensionStatusModal.module.scss';
import { useGetSelfExtensionRequestsQuery } from '@/app/services/tasksApi';
import { SmallSpinner } from '../tasks/card/SmallSpinner';
import moment from 'moment';
import { ExtensionRequestDetails } from './ExtensionRequestDetails';
import { ExtensionRequest, ExtensionDetailItem } from '@/interfaces/task.type';
import { ExtensionRequestForm } from './ExtensionRequestForm';

type ExtensionStatusModalProps = {
    isOpen: boolean;
    onClose: () => void;
    taskId: string;
    dev: boolean;
    assignee: string;
    initialOldEndsOn?: Date | null;
};

const formatToDateTime = (timestamp: number) => {
    const timestampMs = timestamp < 1e12 ? timestamp * 1000 : timestamp;
    return moment(timestampMs).format('DD/MM/YYYY, h:mm:ss A');
};

export const formatToRelativeTime = (timestamp: number) => {
    const timestampMs = timestamp < 1e12 ? timestamp * 1000 : timestamp;
    return moment(timestampMs).fromNow();
};

const getStatusClass = (status: string, styles: any) => {
    switch (status) {
        case 'APPROVED':
            return styles.extensionApproved;
        case 'DENIED':
            return styles.extensionDenied;
        default:
            return styles.extensionPending;
    }
};

const getExtensionRequestDetails = (
    request: ExtensionRequest,
    styles: Record<string, string>
): ExtensionDetailItem[] => [
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
        label: 'Title :',
        value: request.title,
        testId: 'request-title',
    },
    {
        label: 'Old Ends On :',
        value: formatToDateTime(request.oldEndsOn),
        testId: 'old-ends-on',
    },
    {
        label: 'New Ends On :',
        value: formatToDateTime(request.newEndsOn),
        testId: 'new-ends-on',
    },
    {
        label: 'Status :',
        value: request.status,
        className: getStatusClass(request.status, styles),
        testId: 'request-status',
    },
];

export function ExtensionStatusModal({
    isOpen,
    onClose,
    taskId,
    dev,
    assignee,
    initialOldEndsOn,
}: ExtensionStatusModalProps) {
    const { data, isLoading, error } = useGetSelfExtensionRequestsQuery(
        { taskId, dev },
        { skip: !isOpen }
    );
    const modalRef = useRef<HTMLDivElement>(null);
    const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
    const [oldEndsOn, setOldEndsOn] = useState<number | null>(null);

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

    useEffect(() => {
        if (!isOpen) return;

        const allRequests = data?.allExtensionRequests ?? [];

        if (allRequests.length > 0) {
            const latestRequest = [...allRequests].sort(
                (a, b) => b.requestNumber - a.requestNumber
            )[0];

            const isApproved = latestRequest.status === 'APPROVED';
            const endsOnTimestamp = isApproved
                ? latestRequest.newEndsOn < 1e12
                    ? latestRequest.newEndsOn * 1000
                    : latestRequest.newEndsOn
                : initialOldEndsOn
                ? initialOldEndsOn.getTime()
                : null;

            setOldEndsOn(endsOnTimestamp);
        } else {
            setOldEndsOn(initialOldEndsOn ? initialOldEndsOn.getTime() : null);
        }
    }, [isOpen, data, taskId, dev]);

    const handleOutsideClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    const handleOpenRequestForm = () => {
        setIsRequestFormOpen(true);
        onClose();
    };

    const handleCloseRequestForm = () => setIsRequestFormOpen(false);

    if (!isOpen && !isRequestFormOpen) return null;

    if (!isOpen && isRequestFormOpen) {
        return (
            <ExtensionRequestForm
                isOpen={isRequestFormOpen}
                onClose={handleCloseRequestForm}
                taskId={taskId}
                assignee={assignee}
                oldEndsOn={oldEndsOn}
            />
        );
    }

    if (isLoading) {
        return (
            <div
                className={styles.extensionModalOverlay}
                data-testid="extension-modal-overlay"
            >
                <div
                    className={styles.extensionModalLoading}
                    data-testid="extension-modal-loading"
                >
                    <h2 data-testid="modal-title">Extension Details</h2>
                    <div
                        className={styles.spinnerContainer}
                        data-testid="loading-spinner"
                    >
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
            data-testid="extension-modal-overlay"
        >
            <div
                className={styles.extensionModal}
                ref={modalRef}
                data-testid="extension-modal-content"
            >
                <h2 data-testid="modal-title">Extension Details</h2>

                <ExtensionRequestDetails
                    extensionRequests={extensionRequests}
                    styles={styles}
                    getExtensionRequestDetails={getExtensionRequestDetails}
                />

                <div
                    className={styles.extensionButtonContainer}
                    style={{
                        justifyContent: hasPendingRequest
                            ? 'center'
                            : 'space-between',
                    }}
                    data-testid="button-container"
                >
                    <button
                        className={styles.extensionCloseButton}
                        onClick={onClose}
                        data-testid="close-button"
                    >
                        Close
                    </button>
                    {!hasPendingRequest && (
                        <button
                            className={styles.extensionRequestButton}
                            data-testid="request-extension-button"
                            onClick={handleOpenRequestForm}
                        >
                            Request Extension
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
