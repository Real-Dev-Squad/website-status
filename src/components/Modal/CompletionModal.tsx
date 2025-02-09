// Temporary Skeleton Component for CompletionModal
// --------------------------------------------------
// This component is a placeholder to ensure that the build passes without linting issues.
// Since the associated tests are already skipped, we only need a minimal implementation
// to avoid errors related to missing exports or undefined components.

import React from 'react';

interface CompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen }) => {
    if (!isOpen) return null;
    return <div data-testid="completion-modal"></div>;
};
