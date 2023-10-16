import React, { ReactNode } from 'react';
import styles from '@/components/Modal/modal.module.scss';

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

export default function Modal(props: ModalType) {
    return (
        <>
            {props.isOpen && (
                <div
                    className={styles.modalOverlay}
                    onClick={props.toggle}
                    data-testid="modal-overlay"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={styles.modalBox}
                        data-testid="modal-box"
                    >
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
}
