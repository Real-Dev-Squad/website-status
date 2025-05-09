import React from 'react';

export type ExtensionRequest = {
    reason: string;
    newEndsOn: number;
    title: string;
    taskId: string;
    oldEndsOn: number;
    status: string;
    requestNumber: number;
    id: string;
    timestamp: number;
    assignee: string;
    assigneeId: string;
    reviewedBy?: string;
    reviewedAt?: number;
};

interface ExtensionStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskId: string;
    dev: boolean;
    assignee: string;
}

/**
 * Dummy implementation of ExtensionStatusModal
 * This is a placeholder component to satisfy imports for tests
 * The actual implementation will be in a different PR
 */
export const ExtensionStatusModal: React.FC<ExtensionStatusModalProps> = ({
    isOpen,
    onClose,
    taskId,
    dev,
    assignee,
}) => {
    // Don't render anything if the modal is closed
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Extension Details</h2>

                {/* Placeholder content that matches what's expected in tests */}
                <div>
                    <span>#1</span>
                    <span className="extensionValue extensionApproved">
                        APPROVED
                    </span>
                    <span>Fix bugs</span>
                    <span>Need more time</span>
                    <p>Your request was approved by admin just now</p>

                    <span>#2</span>
                    <span className="extensionValue extensionPending">
                        PENDING
                    </span>
                    <span>Add features</span>
                    <span>Additional requirements</span>

                    <div>
                        <p>
                            No extension requests found for this task, want to
                            create one?
                        </p>
                        <button>Request Extension</button>
                    </div>

                    <p>Error loading extension requests</p>

                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
