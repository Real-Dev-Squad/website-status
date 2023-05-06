import React, { FC, useState } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';

import { addStandup } from '@/interfaces/standup.type';
import { FormatDate } from '@/utils/FormatDate';
import { LOGIN_URL } from '@/components/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import StandUpContainer from '@/components/standup';
import { useAppContext } from '@/context';

const StandUp: FC = () => {
    const [update, setUpdate] = useState<addStandup>({
        type: 'user',
        completed: '',
        planned: '',
        blockers: '',
    });
    const [buttonDisable, setButtonDisable] = useState<boolean>(true);

    const { isLoggedIn, isLoading } = useAuthenticated();

    const { state } = useAppContext();
    const { isLoading: isAuthenticating } = state;

    const yesterdayDate = FormatDate();

    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setButtonDisable(false);
        setUpdate({ type: 'user', completed: '', planned: '', blockers: '' });
        setButtonDisable(true);
        console.log(update);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdate({
            ...update,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Layout>
            <Head title="Standup" />
            {!isAuthenticating && isLoggedIn ? (
                isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <StandUpContainer
                        handleChange={handleChange}
                        handleFormSubmission={handleFormSubmission}
                        buttonDisable={buttonDisable}
                        yesterdayDate={yesterdayDate}
                        completed={update.completed}
                        blockers={update.blockers}
                        planned={update.planned}
                    />
                )
            ) : (
                <div>
                    <p>You are not Authorized</p>
                    <a href={LOGIN_URL} target="_blank" rel="noreferrer">
                        Click here to Login
                    </a>
                </div>
            )}
        </Layout>
    );
};

export default StandUp;
