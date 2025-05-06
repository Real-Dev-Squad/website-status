import React, { useState, useEffect } from 'react';
import styles from './Form.module.scss';
import { useCreateExtensionRequestMutation } from '@/app/services/tasksApi';

interface ExtensionRequestFormProps {
    isOpen: boolean;
    onClose: () => void;
    taskId: string;
    assignee: string;
    oldEndsOn: number | null;
}

interface FormData {
    reason: string;
    newEndsOn: number;
    title: string;
}

export const ExtensionRequestForm: React.FC<ExtensionRequestFormProps> = ({
    isOpen,
    onClose,
    taskId,
    assignee,
    oldEndsOn,
}) => {
    const [formData, setFormData] = useState<FormData>({
        reason: '',
        newEndsOn: new Date().getTime(),
        title: '',
    });

    const [createExtensionRequest, { isLoading }] =
        useCreateExtensionRequestMutation();

    useEffect(() => {
        if (isOpen) {
            const defaultNewEndsOn = oldEndsOn
                ? oldEndsOn + 3 * 24 * 60 * 60 * 1000
                : new Date().getTime();
            setFormData((prev) => ({ ...prev, newEndsOn: defaultNewEndsOn }));
        }
    }, [isOpen, oldEndsOn]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (name === 'newEndsOn') {
            const timestamp = new Date(value).getTime();
            setFormData((prev) => ({ ...prev, [name]: timestamp }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const submissionOldEndsOn = oldEndsOn || new Date().getTime();

        try {
            console.log('Sending data:', {
                ...formData,
                taskId,
                oldEndsOn: submissionOldEndsOn,
            });

            await createExtensionRequest({
                assignee: assignee,
                newEndsOn: formData.newEndsOn,
                oldEndsOn: submissionOldEndsOn,
                reason: formData.reason,
                status: 'PENDING',
                taskId,
                title: formData.title,
                dev: true,
            }).unwrap();

            onClose();
        } catch (error) {
            console.error('Failed to create extension request:', error);
        }
    };

    if (!isOpen) return null;

    const oldEndsOnDate = oldEndsOn
        ? new Date(oldEndsOn).toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true,
          })
        : 'Not available';

    const formatDateForInput = (timestamp: number) =>
        new Date(timestamp).toISOString().slice(0, 16);

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.heading}>Extension Request Form</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="reason">
                            Reason
                        </label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            rows={4}
                            className={styles.textArea}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <div className={styles.oldEta}>
                            Old ETA - {oldEndsOnDate}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="newEndsOn">
                            New ETA
                        </label>
                        <input
                            type="datetime-local"
                            id="newEndsOn"
                            name="newEndsOn"
                            value={formatDateForInput(formData.newEndsOn)}
                            onChange={handleChange}
                            className={`${styles.input} ${styles.dateTimeInput}`}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="title">
                            Title
                        </label>
                        <textarea
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            rows={3}
                            className={styles.textArea}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className={styles.formActions}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${styles.submitBtn} ${
                                isLoading ? styles.disabledBtn : ''
                            }`}
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
