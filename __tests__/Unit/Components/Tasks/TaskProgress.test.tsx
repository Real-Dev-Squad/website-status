import { render, screen } from '@testing-library/react';
import TaskProgress from '@/components/taskDetails/TaskProgress';
import { ProgressDetailsData } from '@/types/standup.type';

const taskProgress: ProgressDetailsData[] = [
    {
        id: 'oyuxEvdbA2iNBD7kRddP',
        date: 1724716800000,
        createdAt: 1724782717255,
        blockers: 'test',
        completed: 'test',
        planned: 'test',
        type: 'task',
        userId: 'p9Q7dojToB3i8dNv8k8u',
        taskId: 'o3VRAUCPoeeqU9FXySDD',
    },
];

describe('TaskProgress Component', () => {
    it('should render the task progress correctly', () => {
        render(<TaskProgress taskProgress={taskProgress} />);
        const progressElements = screen.getAllByText('test');
        expect(progressElements.length).toBe(3);
    });

    it('should render "No Progress found" when there is no progress', () => {
        render(<TaskProgress taskProgress={[]} />);
        expect(screen.getByText('No Progress found')).toBeInTheDocument();
    });
});
