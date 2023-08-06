import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Textarea } from '@/components/taskDetails';
import { TaskDependencyProps } from '@/interfaces/taskDetails.type';
import DependencyList from '@/components/taskDetails/taskDependency/DependencyList';
import { parseDependencyValue } from '@/utils/parseDependency';
import useDebounce from '@/hooks/useDebounce';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';

interface Task {
    id: string;
    title: string;
}

type eventType = {
    target: {
        name: string;
        value: string;
    };
};

const TaskDependency: FC<TaskDependencyProps> = ({
    taskDependencyIds,
    isEditing,
    handleChange,
    setEditedTaskDetails,
}) => {
    const [editedDependencies, setEditedDependencies] =
        useState<string[]>(taskDependencyIds);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const {
        data: searchResults,
        isLoading,
        error,
    } = useGetAllTasksQuery({
        term: debouncedSearchTerm,
    });

    useEffect(() => {
        setEditedDependencies(taskDependencyIds);
    }, [taskDependencyIds]);

    const handleDependenciesChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        const updatedDependencies = parseDependencyValue(value);

        setEditedDependencies(updatedDependencies);
        handleChange(event);
        setSearchTerm(value);
        setEditedTaskDetails((prevState) => ({
            ...prevState!,
            taskData: {
                ...prevState,
                [name]: updatedDependencies,
            },
        }));
    };

    const handleTaskClick = (task: Task) => {
        const event: eventType = {
            target: {
                name: 'dependsOn',
                value: task.id,
            },
        };

        handleDependenciesChange(event as ChangeEvent<HTMLInputElement>);
        setSearchTerm(task.id);
    };

    return (
        <>
            {isEditing && (
                <div>
                    <Textarea
                        name="dependsOn"
                        value={editedDependencies.join(',')}
                        onChange={handleDependenciesChange}
                        testId="dependency-textarea"
                    />
                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error fetching search results</p>}
                    {searchResults && searchResults.tasks && (
                        <div>
                            {searchResults.tasks.map((task: Task) => (
                                <div
                                    key={task.id}
                                    onClick={() => handleTaskClick(task)}
                                >
                                    {task.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            <DependencyList taskDependencyIds={taskDependencyIds} />
        </>
    );
};

export default TaskDependency;
