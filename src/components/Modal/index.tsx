import React, { ReactNode, useEffect } from 'react';
import styles from '@/components/Modal/modal.module.scss';
import { RxCross2 } from 'react-icons/rx';
interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

export default function Modal(props: ModalType) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                props.toggle();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.toggle]);

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
                        <p
                            className={styles.closeButton}
                            onClick={props.toggle}
                            data-testid="close-button"
                        >
                            <RxCross2 size={25} className="closeIcon" />
                        </p>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
}
