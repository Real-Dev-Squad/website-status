import { FC } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaCircleCheck } from 'react-icons/fa6';
import styles from '@/components/Modal/modal.module.scss';

interface CompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CompletionModal: FC<CompletionModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlayModal}>
            <div className={styles.boxModal}>
                <IoMdClose className={styles.closeIcon} onClick={onClose} />
                <FaCircleCheck className={styles.checkIcon} />
                <h3>Congratulations!</h3>
                <p>You have achieved 100% completion!</p>
                <p>Would you like to update your status?</p>
                <div className={styles.modalButtons}>
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
        </div>
    );
};

export default CompletionModal;
