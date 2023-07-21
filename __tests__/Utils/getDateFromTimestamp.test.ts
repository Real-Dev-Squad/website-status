import { getDateFromTimestamp } from '@/utils/getDateFromTimestamp';

describe('getDateFromTimestamp', () => {
    test('Function returns correct value of tate for provided timestamp', () => {
        expect(getDateFromTimestamp(1689944270697)).toEqual(
            'Friday, 21 July 2023'
        );
    });
});
