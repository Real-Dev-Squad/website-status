import { useRouter } from 'next/router';

import PageNotFound from '../404';
import ProgressLayout from '@/components/ProgressForm/ProgressLayout';

const ProgressUpdatesPage = () => {
    const router = useRouter();

    const { id, dev } = router.query;

    if (!id || dev !== 'true') {
        return <PageNotFound />;
    }

    return <ProgressLayout taskId={id} />;
};

export default ProgressUpdatesPage;
