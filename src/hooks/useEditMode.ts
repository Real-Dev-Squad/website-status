import { useRouter } from 'next/router';

export const useEditMode = () => {
    const router = useRouter();
    const { query } = router;
    const { edit: editQuery } = query;
    const isEditMode = editQuery === 'true';
    const onEditRoute = () => {
        router.push({ query: 'edit=true' }, undefined, { shallow: true });
    };
    return { isEditMode, onEditRoute };
};
