import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import task from '@/interfaces/task.type';

describe('updateTasksStatus', () => {
    it('should update the status of tasks correctly', () => {
        const tasks = [
            { id: '1', status: 'active' },
            { id: '2', status: 'pending' },
            { id: '3', status: 'assigned' },
            { id: '4', status: 'unassigned' },
            { id: '5', status: 'completed' },
            { id: '6', status: 'blocked' },
        ] as task[];

        const updatedTasks = updateTasksStatus(tasks);

        expect(updatedTasks).toEqual([
            { id: '1', status: 'IN_PROGRESS' },
            { id: '2', status: 'IN_PROGRESS' },
            { id: '3', status: 'ASSIGNED' },
            { id: '4', status: 'AVAILABLE' },
            { id: '5', status: 'COMPLETED' },
            { id: '6', status: 'BLOCKED' },
        ]);
    });
});
