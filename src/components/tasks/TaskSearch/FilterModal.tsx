import styles from './tasksearch.module.scss';
import {
    Tab,
    depreciatedTaskStatus,
    newTaskStatus,
} from '@/interfaces/task.type';
import { getChangedStatusName } from '@/utils/getChangedStatusName';
import { useEffect } from 'react';

type FilterModalProps = {
    tabs: Tab[];
    onSelect: (tab: Tab) => void;
    activeTab?: Tab;
    onClose: () => void;
    dev?: boolean;
};

const FilterModal = ({
    tabs,
    onSelect,
    activeTab,
    onClose,
    dev,
}: FilterModalProps) => {
    const onKeyDownHandler = (event: KeyboardEvent) => {
        if (dev && event.key === 'Escape') onClose();
    };
    useEffect(() => {
        document.addEventListener('keydown', onKeyDownHandler);
        return () => document.removeEventListener('keydown', onKeyDownHandler);
    }, []);

    return (
        <>
            {dev && (
                <div
                    onClick={onClose}
                    className={styles['filter-modal-background']}
                ></div>
            )}
            <div
                className={`${styles['filter-modal']} ${
                    dev ? styles['filter-modal-dev'] : ''
                }`}
                data-testid="filter-modal"
            >
                <div className={styles['filter-modal-title']}>
                    <span>Filter</span>
                    <span className={styles['close-button']} onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className={styles['status-filter']}>
                    {tabs
                        .filter((tab: Tab) =>
                            dev
                                ? !depreciatedTaskStatus.includes(tab)
                                : tab != 'BLOCKED' &&
                                  !newTaskStatus.includes(tab)
                        )
                        .map((tab) => (
                            <button
                                key={tab}
                                className={`${styles['status-button']} ${
                                    activeTab === tab
                                        ? styles['status-button-active']
                                        : ''
                                }`}
                                onClick={() => {
                                    onSelect(tab);
                                    onClose();
                                }}
                            >
                                {getChangedStatusName(tab)}
                            </button>
                        ))}
                </div>
            </div>
        </>
    );
};

export default FilterModal;
