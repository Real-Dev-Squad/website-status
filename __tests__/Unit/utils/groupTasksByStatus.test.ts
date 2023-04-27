import groupTasksByStatus from '@/utils/groupTasksByStatus';
import { tasks } from '../../../__mocks__/db/tasks';

describe('Test groupTasksByStatus util', () => {
    test('Should return the correct response', async () => {
        const groupedTasks = groupTasksByStatus(tasks);
        expect(groupedTasks).toHaveProperty('progress');

        expect(groupedTasks['progress']).toHaveLength(10);
        expect(groupedTasks['progress'][0]).toEqual(tasks[0]);
    });
});
