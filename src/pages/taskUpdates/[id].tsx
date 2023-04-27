import { useRouter } from 'next/router';

import PageNotFound from '@/pages/404';

import { BASE_URL } from '@/components/constants/url';

const ProgressUpdatesPage = () => {
    const router = useRouter();
    const id = router.query?.id as string;
    const SAVE_TASK_UPDATES_URL = `${BASE_URL}/progressupdates/save/${id}`;
    const TASK_DETAILS_URL = `${BASE_URL}/${id}/details`;
    const GET_TASK_UPDATES_URL = `${BASE_URL}/progressupdates/${id}`;

    if (!id){
        return <PageNotFound/>;
    } else {
        return (
            <div>
                <p>Welcome to task updates page</p>
                <p>{SAVE_TASK_UPDATES_URL}</p>
                <p>{GET_TASK_UPDATES_URL}</p>
                <p>{TASK_DETAILS_URL}</p>
            </div>
        );
    }
};

export default ProgressUpdatesPage;