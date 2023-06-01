import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Active from '@/components/challenges/active';
import Complete from '@/components/challenges/complete';
import Accordion from '@/components/Accordion';
import { challengeDataType, ChallengeMap } from '@/interfaces/challenge.type';
import classNames from '@/styles/tasks.module.scss';
import { LOGIN_URL } from '@/constants/url';
import { useGetUserQuery } from '@/app/services/userApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import useAuthenticated from '@/hooks/useAuthenticated';
import { useGetChallengesQuery } from '@/app/services/challengesApi';

const renderCardList = (
    challengeSection: challengeDataType['content'],
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
                                {Object.keys(filteredChallenge).length > 0 ? (
                                    Object.keys(filteredChallenge).map(
                                        (key) =>
                                            filteredChallenge[key].length >
                                                0 && (
                                                <Accordion
                                                    open
                                                    title={key}
                                                    key={key}
                                                >
                                                    {renderCardList(
                                                        filteredChallenge[key],
                                                        key,
                                                        user?.id ?? ''
                                                    )}
                                                </Accordion>
                                            )
                                    )
                                ) : (
                                    <p>No Challenges Found</p>
                                )}
                            </>
                        )
                    ) : (
                        <div>
                            <p>You are not Authorized</p>
                            <a
                                href={LOGIN_URL}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Click here to Login
                            </a>
                        </div>
                    ))}
            </div>
        </Layout>
    );
};
export default Challenges;
