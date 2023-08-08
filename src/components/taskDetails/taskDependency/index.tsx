import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Textarea } from '@/components/taskDetails';
import { TaskDependencyProps } from '@/interfaces/taskDetails.type';
import DependencyList from '@/components/taskDetails/taskDependency/DependencyList';
import useDebounce from '@/hooks/useDebounce';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import classNames from '../task-details.module.scss';

interface Task {
    id: string;
    title: string;
}

const TaskInput: FC<{
    searchTerm: string;
    handleChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}> = ({ searchTerm, handleChange }) => (
    <>
        <Textarea
            name="dependsOn"
            value={searchTerm}
            onChange={handleChange}
            testId="dependency-textarea"
        />
    </>
);

const TaskCheckbox: FC<{
    tasks: Task[];
    selectedTasks: Task[];
    handleSelectTask: (task: Task) => void;
}> = ({ tasks, selectedTasks, handleSelectTask }) => (
    <div className={classNames['task_dependency_search_dropdown']}>
        {tasks.map((task: Task) => (
            <div key={task.id}>
                <input
                    data-testid="taskCheckbox"
                    type="checkbox"
                    checked={selectedTasks.some((t) => t.id === task.id)}
                    onChange={() => handleSelectTask(task)}
                />
                {task.title}
            </div>
        ))}
    </div>
);

const TaskDependency: FC<TaskDependencyProps> = ({
    taskDependencyIds,
    isEditing,
    setEditedTaskDetails,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const {
        data: searchResults,
        isLoading,
        isError,
    } = useGetAllTasksQuery(
        {
            term: debouncedSearchTerm,
        },
        { skip: debouncedSearchTerm ? false : true }
    );

    useEffect(() => {
        const updatedDependencies = selectedTasks.map((task) => task.id);

        setEditedTaskDetails((prevState) => ({
            ...prevState!,
            dependsOn: updatedDependencies,
        }));
    }, [selectedTasks, setEditedTaskDetails]);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSearchTerm(event.target.value);
    };

    const handleSelectTask = (task: Task) => {
        setSelectedTasks((prevSelected) => {
            const isSelected = prevSelected.some((t) => t.id === task.id);
            return isSelected
                ? prevSelected.filter((t) => t.id !== task.id)
                : [...prevSelected, task];
        });
    };

    return (
        <>
            {isEditing && (
                <div className={classNames.task_dependency_search_dropdown}>
                    <TaskInput
                        searchTerm={searchTerm}
                        handleChange={handleChange}
                    />
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>No task found</p>}
                    {searchResults && searchResults.tasks && (
                        <TaskCheckbox
                            tasks={searchResults.tasks}
                            selectedTasks={selectedTasks}
                            handleSelectTask={handleSelectTask}
                        />
                    )}
                </div>
            )}
            <DependencyList taskDependencyIds={taskDependencyIds} />
        </>
    );
};

export default TaskDependency;
