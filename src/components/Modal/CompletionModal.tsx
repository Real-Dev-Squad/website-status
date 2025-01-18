import { FC } from 'react';
import { MdCheck } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';
import { FaCircleCheck } from 'react-icons/fa6';
import styles from '@/components/tasks/card/card.module.scss';

interface CompletionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStatusChange: () => void;
}

const CompletionModal: FC<CompletionModalProps> = ({
    isOpen,
    onClose,
    onStatusChange,
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.ModalOverlay}>
            <div className={styles.ModalBox}>
                <FaCircleCheck className={styles.checkIcon} />
                <h3>Congratulations!</h3>
                <p style={{ fontWeight: 'bold' }}>
                    You have achieved 100% completion! Would you like to update
                    your status?
                </p>
                <div className={styles.ModalButtons}>
                    <button
                        className={styles.changeStatusButton}
                        onClick={() => {
                            onStatusChange();
                            onClose();
                        }}
                    >
                        <MdCheck /> Change Status
                    </button>
                    <button className={styles.closeButton} onClick={onClose}>
                        <IoMdClose /> Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompletionModal;
