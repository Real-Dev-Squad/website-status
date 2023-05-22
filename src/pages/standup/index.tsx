import { FC } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';

import { LOGIN_URL } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import StandUpContainer from '@/components/standup';
import { useGetUserQuery } from '@/app/services/userApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const StandUp: FC = () => {
    const { isLoggedIn, isLoading } = useAuthenticated();

    const { isLoading: isAuthenticating } = useGetUserQuery(skipToken);

    const handleConditionalRendering = () => {
        if (!isAuthenticating && isLoggedIn) {
            if (isLoading) {
                return <p>Loading...</p>;
            } else {
                return <StandUpContainer />;
            }
        } else {
            <div>
                <p>You are not Authorized</p>
                <a href={LOGIN_URL} target="_blank" rel="noreferrer">
                    Click here to Login
                </a>
            </div>;
        }
    };

    return (
        <Layout>
            <Head title="Standup" />
            {handleConditionalRendering()}
        </Layout>
    );
};

export default StandUp;
