import { FC, memo } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

import { LOGIN_URL } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import StandUpContainer from '@/components/standup';
import { useGetUserQuery } from '@/app/services/userApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import PageNotFound from '../404';

const StandUp: FC = memo(function StandUp() {
    const { isLoggedIn, isLoading } = useAuthenticated();

    const { isLoading: isAuthenticating } = useGetUserQuery(skipToken);
    const router = useRouter();

    const { dev } = router.query;

    const handleConditionalRendering = () => {
        if (!isAuthenticating) {
            if (isLoading) {
                return <p>Loading...</p>;
            } else if (isLoggedIn) {
                return <StandUpContainer />;
            } else {
                return (
                    <div>
                        <p>You are not Authorized</p>
                        <a href={LOGIN_URL} target="_blank" rel="noreferrer">
                            Click here to Login
                        </a>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <p>You are not Authorized</p>
                    <a href={LOGIN_URL} target="_blank" rel="noreferrer">
                        Click here to Login
                    </a>
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
