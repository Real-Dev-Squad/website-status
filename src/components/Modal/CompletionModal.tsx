import React from 'react';
import Modal from '@/components/Modal/index';
import { IoMdClose } from 'react-icons/io';
import { FaCircleCheck } from 'react-icons/fa6';
import styles from '@/components/Modal/modal.module.scss';

interface CompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal isOpen={isOpen} toggle={onClose}>
            <div className={styles.modalContent}>
                <IoMdClose className={styles.closeIcon} onClick={onClose} />
                <FaCircleCheck className={styles.checkIcon} />
                <h3 className={styles.title}>Congratulations!</h3>
                <p className={styles.text}>
                    You have achieved 100% completion!
                </p>
                <p className={styles.text}>
                    Would you like to update your status?
                </p>
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.changeStatusButton}
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Change Status
                    </button>
                    <button className={styles.closeButton} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CompletionModal;
