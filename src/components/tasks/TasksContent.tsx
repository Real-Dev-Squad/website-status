import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import { Tab } from '@/interfaces/task.type';
import { useState } from 'react';
import { TASKS_FETCH_ERROR_MESSAGE } from '../../constants/messages';
import { TabSection } from './TabSection';
import { useRouter } from 'next/dist/client/router';
import RenderTasksList from './RenderTasksList';

export const TasksContent = () => {
    const router = useRouter();
    const { dev = false } = router.query;
    const [activeTab, setActiveTab] = useState(Tab.IN_PROGRESS);
    const [nextPage, setNextPage] = useState<string>('');
    const [prevPage, setPrevPage] = useState<string>('');

    const {
        data: tasksData = { tasks: [], next: '', prev: '' },
        isError,
        isLoading,
        isFetching,
    } = useGetAllTasksQuery({
        dev: dev as boolean,
        status: activeTab,
        nextPage,
        prevPage,
    });

    const fetchNextTasks = () => {
        if (tasksData.next) {
            setPrevPage('');
            setNextPage(tasksData.next);
        }
    };

    const fetchPrevTasks = () => {
        if (tasksData.prev) {
            setNextPage('');
            setPrevPage(tasksData.prev);
        }
    };

    const onSelect = (tab: Tab) => {
        setActiveTab(tab);
        setNextPage('');
        setPrevPage('');
    };

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;

    return (
        <div className={classNames.tasksContainer}>
            <TabSection onSelect={onSelect} activeTab={activeTab} />
            <div>
                <RenderTasksList
                    isFetching={isFetching}
                    dev={dev as string}
                    tasksData={tasksData}
                    activeTab={activeTab}
                />
            </div>
            {dev === 'true' ? (
                <div className={classNames.paginationButtonContainer}>
                    <button
                        className={classNames.paginationButton}
                        onClick={fetchPrevTasks}
                        disabled={!tasksData.prev}
                    >
                        Prev
                    </button>
                    <button
                        className={classNames.paginationButton}
                        onClick={fetchNextTasks}
                        disabled={!tasksData.next}
                    >
                        Next
                    </button>
                </div>
            ) : null}
        </div>
    );
};
