import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { Textarea } from '@/components/taskDetails';
import { TaskDependencyProps } from '@/interfaces/taskDetails.type';
import DependencyList from '@/components/taskDetails/taskDependency/DependencyList';
import useDebounce from '@/hooks/useDebounce';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';

interface Task {
    id: string;
    title: string;
}
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

    const handleDependenciesChange = (
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
                <div>
                    <Textarea
                        name="dependsOn"
                        value={searchTerm}
                        onChange={handleDependenciesChange}
                        testId="dependency-textarea"
                    />
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>No task found</p>}
                    {searchResults && searchResults.tasks && (
                        <div>
                            {searchResults.tasks.map((task: Task) => (
                                <div key={task.id}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTasks.some(
                                            (t) => t.id === task.id
                                        )}
                                        onChange={() => handleSelectTask(task)}
                                    />
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
