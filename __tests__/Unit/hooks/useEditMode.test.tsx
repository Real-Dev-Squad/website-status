import { useEditMode } from '@/hooks/useEditMode';
import { renderHook } from '@testing-library/react-hooks';
import { Router } from 'next/router';

jest.mock('next/router', () => {
    return {
        useRouter: (): Partial<Router> => {
            return {
                route: '/',
                query: {},
            };
        },
    };
});
/* eslint-disable */
const useRouter = jest.spyOn(require('next/router'), 'useRouter');
describe('useEditMode', () => {
    it('should return isEditMode as false when edit query param is not present', () => {
        useRouter.mockImplementation(() => {
            return {
                route: '/',
                query: {},
            };
        });
        const { result } = renderHook(() => useEditMode());

        const { isEditMode } = result.current;

        expect(isEditMode).toBe(false);
    });

    it('should return isEditMode as true when edit query param is set to true', () => {
        useRouter.mockImplementation(() => {
            return {
                route: '/',
                query: { edit: 'true' },
            };
        });
        const { result } = renderHook(() => useEditMode());

        const { isEditMode } = result.current;

        expect(isEditMode).toBe(true);
    });

    it('should call router.push with correct query params when onEditRoute is called', () => {
        const push = jest.fn();

        useRouter.mockImplementation(() => {
            return {
                route: '/',
                query: { edit: 'true' },
                push,
            };
        });
        const { result } = renderHook(() => useEditMode());
        const { onEditRoute } = result.current;

        onEditRoute();

        expect(push).toHaveBeenCalledWith({ query: 'edit=true' }, undefined, {
            shallow: true,
        });
    });
});
