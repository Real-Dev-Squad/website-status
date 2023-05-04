import {useRouter} from 'next/router';
import PageNotFound from '../404';
import ProgressForm from '@/components/ProgressForm/ProgressForm';

const ProgressUpdatesPage = () => {
    const router = useRouter();
    const id = router.query?.id as string;
    const devMode = router.query?.dev as string;

    if(!id || devMode !== 'true'){
        return <PageNotFound/>;
    }

    return <ProgressForm/>;
};

export default ProgressUpdatesPage;