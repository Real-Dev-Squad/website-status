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
    handleChange,
}) => {
    const [editedDependencies, setEditedDependencies] =
        useState<string[]>(taskDependencyIds);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    console.log(editedDependencies);
    const {
        data: searchResults,
        isLoading,
        error,
    } = useGetAllTasksQuery({
        term: debouncedSearchTerm,
    });
    const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);

    const handleDependenciesChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSearchTerm(event.target.value);
    };

    const handleSelectTask = (task: Task) => {
        if (!editedDependencies.includes(task.id)) {
            setSelectedTasks((prevSelected) => [...prevSelected, task]);
        } else {
            setSelectedTasks((prevSelected) =>
                prevSelected.filter((t) => t.id !== task.id)
            );
        }
    };

    useEffect(() => {
        const updatedDependencies = selectedTasks.map((task) => task.id);
        setEditedDependencies(updatedDependencies);
        console.log('updated dependencies', updatedDependencies);

        console.log('Calling setEditedTaskDetails');
        setEditedTaskDetails((prevState) => ({
            ...prevState!,
            taskData: {
                ...prevState,
                dependsOn: updatedDependencies,
            },
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
