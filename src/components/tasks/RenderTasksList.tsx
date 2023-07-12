import { FC } from 'react';
import { TasksLoader } from './TasksLoader';
import { NO_TASKS_FOUND_MESSAGE } from '@/constants/messages';
import TaskList from './TaskList/TaskList';
import task, { RenderTasksListProps } from '@/interfaces/task.type';

const RenderTasksList: FC<RenderTasksListProps> = ({
    isFetching,
    dev,
    tasksData,
    activeTab,
}) => {
    const tasksGroupedByStatus = tasksData.tasks?.reduce(
        (acc: Record<string, task[]>, curr: task) => {
            return acc[curr.status as keyof task]
                ? {
                      ...acc,
                      [curr.status]: [...acc[curr.status as keyof task], curr],
                  }
                : { ...acc, [curr.status]: [curr] };
        },
        {}
    );
    console.log(tasksGroupedByStatus);

    if (isFetching) {
        return <TasksLoader />;
    }

    if (dev === 'true' && tasksData.tasks?.length) {
        return <TaskList tasks={tasksData.tasks} />;
    }

    if (tasksGroupedByStatus && tasksGroupedByStatus[activeTab]?.length) {
        return <TaskList tasks={tasksGroupedByStatus[activeTab]} />;
    }

    return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
};
export default RenderTasksList;
