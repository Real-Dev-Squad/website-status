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
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
    const {
        data: searchResults,
        isLoading,
        error,
    } = useGetAllTasksQuery({
        term: debouncedSearchTerm,
    });

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

    useEffect(() => {
        const updatedDependencies = selectedTasks.map((task) => task.id);

        setEditedTaskDetails((prevState) => ({
            ...prevState!,
            dependsOn: updatedDependencies,
        }));
    }, [selectedTasks, setEditedTaskDetails]);

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
                    {error && <p>Error fetching search results</p>}
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
