import { handleFeatureFlag } from '@/utils/handleFeatureFlag';

describe('handleFeatureFlag', () => {
    it('should call the callback when dev is true', () => {
        const mockCallback = jest.fn();
        handleFeatureFlag('true', mockCallback);
        expect(mockCallback).toHaveBeenCalled();
    });

    it('should not call the callback when dev is false', () => {
        const mockCallback = jest.fn();
        handleFeatureFlag('false', mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should not call the callback when dev is not provided', () => {
        const mockCallback = jest.fn();
        handleFeatureFlag(undefined, mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });
});
