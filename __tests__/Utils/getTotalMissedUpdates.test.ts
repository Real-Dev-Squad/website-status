import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';

describe('Get Total Missed Updates', () => {
    test('should return 0 if date array is empty', () => {
        const result = getTotalMissedUpdates([]);
        expect(result).toBe(0);
    });

    test('should return 0 if date array has last standup date', () => {
        const result = getTotalMissedUpdates([
            1687305600000, 1685145600000, 1686873600000, 1685836800000,
            1687392000000,
        ]);
        expect(result).toBe(0);
    });

    test('should return number of days between last standup date and current standup date', () => {
        const result = getTotalMissedUpdates([
            1685232000000, 1685404800000, 1685491200000, 1687132800000,
            1685059200000, 1685750400000, 1687219200000, 1685318400000,
            1685577600000, 1686787200000, 1685836800000, 1686873600000,
            1685145600000, 1687305600000,
        ]);
        expect(result).toBe(1);
    });
});
