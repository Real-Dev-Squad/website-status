import React, {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { Textarea } from '@/components/taskDetails';
import { TaskDependencyProps } from '@/interfaces/taskDetails.type';
import DependencyList from '@/components/taskDetails/taskDependency/DependencyList';
import { parseDependencyValue } from '@/utils/parseDependency';

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
    const [searchResults, setSearchResults] = useState<Task[]>([]);
    let timeout: NodeJS.Timeout | null = null;

    const handleDebouncedSearch = useCallback((term: string) => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            fetchSearchResults(term);
        }, 500);
    }, []);

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
        handleDebouncedSearch(value);
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
        setSearchResults([]);
    };

    const fetchSearchResults = async (term: string) => {
        try {
            const response = await fetch(
                `http://localhost:3000/tasks?q=${encodeURIComponent(term)}`
            );
            if (!response.ok) {
                console.error('Error fetching search results');
                return;
            }
            const data = await response.json();
            setSearchResults(data.tasks);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
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
                    {searchResults && (
                        <div>
                            {searchResults.map((task) => (
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
