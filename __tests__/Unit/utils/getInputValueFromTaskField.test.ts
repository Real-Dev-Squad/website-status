import { Tab } from '@/interfaces/task.type';
import getInputValueFromTaskField from '@/utils/getInputValueFromTaskField';

describe('Unit | Util | Get Input Value From Task Field', () => {
    test('should return proper value for only all tab', () => {
        expect(getInputValueFromTaskField(Tab.ALL, [], '')).toBe('status:all');
    });

    test('should return proper value considering every parameter', () => {
        expect(
            getInputValueFromTaskField(Tab.ASSIGNED, ['joy', 'tejas'], 'done')
        ).toBe('status:assigned assignee:joy assignee:tejas done');
    });

    test('should return proper value for all tab and title `done`', () => {
        expect(getInputValueFromTaskField(Tab.ALL, [], 'done')).toBe(
            'status:all  done'
        );
    });

    test('should return proper value for all tab and assignee `joy`', () => {
        expect(getInputValueFromTaskField(Tab.ALL, ['joy'], '')).toBe(
            'status:all assignee:joy'
        );
    });
});
