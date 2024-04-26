import React from 'react';
import Modal from '../Modal';
import styles from './task-dropdown.module.scss';

type Props = {
    message: string;
    resetProgressAndStatus: () => void;
    handleProceed: () => void;
};

const TaskDropDownModel = ({
    message,
    resetProgressAndStatus,
    handleProceed,
}: Props) => (
    <Modal isOpen={!!message} toggle={resetProgressAndStatus}>
        <div className={styles['model-body']}>
            <button
                className={styles['icon-container']}
                onClick={resetProgressAndStatus}
            >
                <img
                    alt="close modal icon"
                    src="/cancel-icon.svg"
                    width="20"
                    height="20"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                    className={styles['close-icon']}
                />
            </button>
        </div>
        <div className={styles['msg-btn-container']}>
            <p className={styles['msg']} data-testid="msg">
                {message}
            </p>
            <div className={styles['button-container']}>
                <button
                    className={styles['cancel-btn']}
                    data-testid="cancel"
                    onClick={resetProgressAndStatus}
                >
                    Cancel
                </button>
                <button
                    className={styles['submit-btn']}
                    type="submit"
                    data-testid="proceed"
                    onClick={handleProceed}
                >
                    Proceed
                </button>
            </div>
        </div>
    </Modal>
);

export default TaskDropDownModel;
