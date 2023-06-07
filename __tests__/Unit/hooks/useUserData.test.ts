import { renderHook } from '@testing-library/react-hooks';
import useUserData from '@/hooks/useUserData';
import { useGetUserQuery } from '@/app/services/userApi';

jest.mock('@/app/services/userApi');

describe('useUserData', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    test('should return authorization status as true', () => {
        const mockData = {
            roles: {
                admin: true,
                super_user: true,
            },
        };

        (useGetUserQuery as jest.Mock).mockReturnValue({
            data: mockData,
            isSuccess: true,
        });

        const { result } = renderHook(() => useUserData());

        expect(useGetUserQuery).toHaveBeenCalledTimes(1);
        expect(result.current.data).toEqual(mockData);
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.isUserAuthorized).toBe(true);
    });

    test('should return  authorization status as false', () => {
        const mockData = {
            roles: {
                admin: false,
                super_user: false,
            },
        };

        (useGetUserQuery as jest.Mock).mockReturnValue({
            data: mockData,
            isSuccess: true,
        });

        const { result } = renderHook(() => useUserData());

        expect(useGetUserQuery).toHaveBeenCalledTimes(1);
        expect(result.current.data).toEqual(mockData);
        expect(result.current.isSuccess).toBe(true);
        expect(result.current.isUserAuthorized).toBe(false);
    });
});
