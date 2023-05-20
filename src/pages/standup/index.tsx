import { FC, useState, memo, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';

import { standupUpdateType } from '@/interfaces/standup.type';
import { getYesterdayDate } from '@/utils/getYesterdayDate';
import { LOGIN_URL } from '@/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import StandUpContainer from '@/components/standup';
import { useGetUserQuery } from '@/app/services/userApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';

const StandUp: FC = () => {
    const [standupUpdate, setStandupUpdate] = useState<standupUpdateType>({
        type: 'user',
        completed: '',
        planned: '',
        blockers: '',
    });
    const [buttonDisable, setButtonDisable] = useState<boolean>(true);

    const { isLoggedIn, isLoading } = useAuthenticated();

    const { isLoading: isAuthenticating } = useGetUserQuery(skipToken);

    const yesterdayDate = getYesterdayDate();

    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setButtonDisable(false);
        setStandupUpdate({
            type: 'user',
            completed: '',
            planned: '',
            blockers: '',
        });
        //needed to set the button disabled=true so that it
        // is clickable for the next time on the same day if user has
        // to submit it after the form is filled and submitted
        // setButtonDisable(!buttonDisable);
        setButtonDisable(true);
        console.log(standupUpdate);
    };

    const handleConditionalRendering = () => {
        if (!isAuthenticating && isLoggedIn) {
            if (isLoading) {
                return <p>Loading...</p>;
            } else {
                return (
                    <StandUpContainer
                        handleChange={handleChange}
                        handleFormSubmission={handleFormSubmission}
                        buttonDisable={buttonDisable}
                        yesterdayDate={yesterdayDate}
                        completed={standupUpdate.completed}
                        blockers={standupUpdate.blockers}
                        planned={standupUpdate.planned}
                    />
                );
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStandupUpdate({
            ...standupUpdate,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Layout>
            <Head title="Standup" />
            {handleConditionalRendering()}
        </Layout>
    );
};

export default StandUp;
