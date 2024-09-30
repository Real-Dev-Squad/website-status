import { Tab } from '@/interfaces/task.type';
import getInputValueFromTaskField from '@/utils/getInputValueFromTaskField';

describe('Unit | Util | Get Input Value From Task Field', () => {
    test('should return proper value for `all` tab', () => {
        expect(getInputValueFromTaskField(Tab.ALL, '')).toBe('status:all');
    });

    test('should return proper value for `assigned` tab and `done` title', () => {
        expect(getInputValueFromTaskField(Tab.ASSIGNED, 'done')).toBe(
            'status:assigned done'
        );
    });

    test('should return proper value for `all` tab and `done` title', () => {
        expect(getInputValueFromTaskField(Tab.ALL, 'done')).toBe(
            'status:all done'
        );
    });
});
