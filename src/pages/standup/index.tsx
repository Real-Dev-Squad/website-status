import { FC, memo } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import useAuthenticated from '@/hooks/useAuthenticated';
import StandUpContainer from '@/components/standup';
import PageNotFound from '../404';
import { loginNode } from '@/constants/nodes';

const StandUp: FC = memo(function StandUp() {
    const { isLoggedIn, isLoading } = useAuthenticated();

    const router = useRouter();

    const { dev } = router.query;

    const handleConditionalRendering = () => {
        if (isLoggedIn) {
            if (isLoading) {
                return <p>Loading...</p>;
            } else {
                return <StandUpContainer />;
            }
        } else {
            return (
                <div>
                    <p>You are not Authorized</p>
                    {loginNode}
                </div>
            );
        }
    };

    const handleShowStandupComponent = () => {
        if (dev === 'true') {
            return (
                <Layout>
                    <Head title="Standup" />
                    {handleConditionalRendering()}
                </Layout>
            );
        } else {
            return <PageNotFound />;
        }
    };

    return <>{handleShowStandupComponent()}</>;
});

export default StandUp;
