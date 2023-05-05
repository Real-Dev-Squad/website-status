import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import { LOGIN_URL } from '@/components/constants/url';
import useAuthenticated from '@/hooks/useAuthenticated';
import { useGetMineTasksQuery } from '@/app/services/tasksApi';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Loader } from '@/components/tasks/card/Loader';

function CardList({ tasks }: { tasks: task[] }) {
    return (
        <>
            {tasks.map((item: task) => (
                <Card
                    content={item}
                    key={item.id}
                    shouldEdit={false}
                    onContentChange={undefined}
                />
            ))}
        </>
    );
}

const Content = () => {
    const { data: tasks, error, isLoading } = useGetMineTasksQuery(skipToken);
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong! Please contact admin</p>;
    if (tasks && tasks.length)
        return (
            <div>
                <CardList tasks={tasks} />
            </div>
        );
    return <p>No Tasks Found</p>;
};

const Mine: FC = () => {
    const { isLoading: isAuthenticating, isLoggedIn } = useAuthenticated();

    return (
        <Layout>
            <Head title="Mine" />
            <div className={classNames.container}>
                <div className={classNames.container}>
                    {isAuthenticating ? (
                        <Loader />
                    ) : isLoggedIn ? (
                        <Content />
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
                    )}
                </div>
            </div>
        </Layout>
    );
};
export default Mine;
