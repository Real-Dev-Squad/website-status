import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import styles from './tasksearch.module.scss';
import { TABS, Tab } from '@/interfaces/task.type';
import FilterModal from './FilterModal';

interface SuggestionCoordinates {
    left: number | null;
    maxWidth: number | null;
    top: number | null;
}
const initialSuggestionCoordinates: SuggestionCoordinates = {
    left: null,
    maxWidth: null,
    top: null,
};

type TaskSearchProps = {
    onSelect: (tab: Tab) => void;
    inputValue: string;
    activeTab?: Tab;
    onInputChange: (value: string) => void;
    onClickSearchButton: (param?: string) => void;
};

const TaskSearch = ({
    onSelect,
    inputValue,
    activeTab,
    onInputChange,
    onClickSearchButton,
}: TaskSearchProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const searchButtonHandler = () => {
        onClickSearchButton();
    };

    const handleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Enter':
                if (inputValue.length > 0) {
                    searchButtonHandler();
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles['task-search-container']}>
            <div id="filter-container" className={styles['filter-container']}>
                <div className={styles['filter-button']} onClick={handleModal}>
                    <p>Filter</p>
                    <LuChevronDown
                        className={` ${
                            modalOpen
                                ? styles['filter-chevron-open']
                                : styles['filter-chevron']
                        }`}
                    />
                    {modalOpen && (
                        <FilterModal
                            dev={false}
                            tabs={TABS as Tab[]}
                            onSelect={onSelect}
                            activeTab={activeTab}
                            onClose={handleModal}
                        />
                    )}
                </div>

                <input
                    className={styles['search-input']}
                    data-testid="search-input"
                    type="text"
                    placeholder="Eg: status:in-progress assignee:sunny-s Build a feature"
                    value={inputValue}
                    onKeyDown={handleKeyPress}
                    onChange={(e) => onInputChange(e.target.value)}
                    spellCheck="false"
                />
            </div>
            <div className={styles['search-button-container']}>
                <button
                    className={styles['search-button']}
                    data-testid="search-button"
                    onClick={searchButtonHandler}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default TaskSearch;
