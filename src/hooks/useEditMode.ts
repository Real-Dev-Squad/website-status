import { useState } from 'react';

export const useEditMode = () => {
    // const router = useRouter();
    // const { query } = router;
    // const { edit: editQuery } = query;
    // const isEditMode = editQuery === 'true';
    const [isEditMode, setIsEditMode] = useState(false);
    const onEditRoute = () => {
        // router.push('/tasks?edit=true', undefined, {
        //     shallow: true,
        // });
        setIsEditMode(true);
    };
    return { isEditMode, onEditRoute };
};
