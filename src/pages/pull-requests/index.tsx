import { FC, useEffect } from 'react';
import PullRequestList from '@/components/PullRequestList';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const PullRequests: FC = () => {
    const router = useRouter();
    const { query } = router;

    const state = query.state;

    useEffect(() => {
        if (!router.isReady) return;

        if (!state || (state !== 'stale' && state !== 'open')) {
            router.push('/pull-requests?state=open&dev=true');
        }
    }, [state, router]);

    if (state && state === 'open') {
        return <PullRequestList prType="open" />;
    } else if (state && state === 'stale') {
        // returning the component inside an extra div ensures proper
        // re-initialization of states in PullRequestList component
        return (
            <div>
                <PullRequestList prType="stale" />
            </div>
        );
    } else {
        return (
            <Layout>
                <>Loading...</>
            </Layout>
        );
    }
};

export default PullRequests;
