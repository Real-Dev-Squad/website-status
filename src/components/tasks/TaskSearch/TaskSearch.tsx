import { useState } from 'react';
import className from './tasksearch.module.scss';

const filterStatus = ['All', 'Open', 'In Progress', 'In Review', 'Done'];

const FilterModal = () => {
    return (
        <div className={className['filter-modal']}>
            <div className={className['filter-modal-content']}>
                <div className={className['filter-modal-title']}>
                    <span>Filter</span>
                    <span className={className['close']}>&times;</span>
                </div>
                <div className={className['filter-modal-content-status']}>
                    <ul
                        className={
                            className['filter-modal-content-status-list']
                        }
                    >
                        {filterStatus.map((status) => (
                            <li key={status}>
                                <button
                                    className={
                                        className[
                                            'filter-modal-content-status-button'
                                        ]
                                    }
                                >
                                    {status}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const TaskSearch = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div className={className['task-search-container']}>
            <div className={className['filter-container']}>
                <button
                    className={className['filter-button']}
                    onClick={handleModalOpen}
                >
                    Filter
                    {modalOpen && <FilterModal />}
                </button>
                <input
                    className={className['search-input']}
                    type="text"
                    placeholder="Eg: is:active assignee:sunny-s key:task"
                />
            </div>
            <div className="buttons">
                <button className={className['search-button']}>Search</button>
            </div>
        </div>
    );
};

export default TaskSearch;
