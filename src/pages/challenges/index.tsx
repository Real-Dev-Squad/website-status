import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Active from '@/components/challenges/active';
import Complete from '@/components/challenges/complete';
import Accordion from '@/components/Accordion';
import { challenge, ChallengeMap } from '@/interfaces/challenge.type';
import classNames from '@/styles/tasks.module.scss';
import { LOGIN_URL } from '@/constants/url';
import { useGetUserQuery } from '@/app/services/userApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import useAuthenticated from '@/hooks/useAuthenticated';
import { useGetChallengesQuery } from '@/app/services/challengesApi';

export const loginNode = (
    <a href={LOGIN_URL()} target="_blank" rel="noreferrer">
        Click here to Login
    </a>
);

const renderCardList = (
    challengeSection: challenge[],
    key: string,
    userId: string
) => {
    if (key === 'Active') {
        return challengeSection.map((item) => (
            <Active content={item} key={item.id} userId={userId} />
        ));
    }
    return challengeSection.map((item) => (
        <Complete content={item} key={item.id} />
    ));
};

const Challenges: FC = () => {
    const [filteredChallenge, setFilteredChallenge] = useState<ChallengeMap[]>(
        []
    );
    const { data: user, isLoading: isAuthenticating } =
        useGetUserQuery(skipToken);
    const { isLoggedIn } = useAuthenticated();
    const { data, isLoading, isError } = useGetChallengesQuery();

    useEffect(() => {
        if (isLoggedIn && data !== undefined) {
            if (data) {
                setFilteredChallenge([data]);
            }
        }
    }, [isLoggedIn, data]);

    return (
        <Layout>
            <Head title="Challenges" />

            <div className={classNames.container}>
                {!isAuthenticating &&
                    (isLoggedIn ? (
                        isLoading ? (
                            <p>Loading...</p>
                        ) : isError ? (
                            <p>
                                An unexpected error has occurred. Please contact
                                the administrator for assistance.
                            </p>
                        ) : (
                            <>
                                {filteredChallenge.length > 0 ? (
                                    filteredChallenge.map((item) => {
                                        const { Active, Completed } = item;
                                        if (
                                            Active.length > 0 ||
                                            Completed.length > 0
                                        ) {
                                            return (
                                                <Accordion
                                                    open
                                                    title="Challenges"
                                                    key="challenges"
                                                >
                                                    {Active.length > 0 &&
                                                        renderCardList(
                                                            Active,
                                                            'Active',
                                                            user?.id ?? ''
                                                        )}
                                                    {Completed.length > 0 &&
                                                        renderCardList(
                                                            Completed,
                                                            'Completed',
                                                            user?.id ?? ''
                                                        )}
                                                </Accordion>
                                            );
                                        }
                                        return null;
                                    })
                                ) : (
                                    <p>No Challenges Found</p>
                                )}
                            </>
                        )
                    ) : (
                        <div>
                            <p>You are not Authorized</p>
                            {loginNode}
                        </div>
                    ))}
            </div>
        </Layout>
    );
};
export default Challenges;
