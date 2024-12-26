import React from 'react';
import Modal from '@/components/Modal/index';
import { IoMdClose } from 'react-icons/io';
import { FaCircleCheck } from 'react-icons/fa6';
import styles from '@/components/Modal/modal.module.scss';

interface CompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal isOpen={isOpen} toggle={onClose} data-testid="completion-modal">
            <div className={styles.modalContent}>
                <button
                    className={styles.closeIcon}
                    onClick={() => {
                        onClose();
                    }}
                    aria-label="Close"
                >
                    <IoMdClose size={25} />
                </button>

                <FaCircleCheck className={styles.checkIcon} />
                <h3 className={styles.title}>Congratulations !</h3>
                <div className={styles.text}>
                    <div>You have achieved 100% completion!</div>
                    <div>Would you like to update your status?</div>
                </div>

                <div className={styles.buttonContainer}>
                    <button
                        className={styles.changeStatusButton}
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Change status
                    </button>
                    <button
                        className={styles.closeButton}
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};
