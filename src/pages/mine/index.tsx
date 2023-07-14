import { FC } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import classNames from '@/styles/tasks.module.scss';
import { TasksResponseType } from '@/interfaces/task.type';
import { LOGIN_URL } from '@/constants/url';
import { NO_TASKS_FOUND_MESSAGE } from '@/constants/messages';
import useAuthenticated from '@/hooks/useAuthenticated';
import { useGetMineTasksQuery } from '@/app/services/tasksApi';
import { Loader } from '@/components/tasks/card/Loader';

function CardList({ tasks: { tasks = [] } }: { tasks: TasksResponseType }) {
    return (
        <>
            {tasks.map((item) => (
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
    const { data: tasks, error, isLoading } = useGetMineTasksQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong! Please contact admin</p>;
    if (tasks && tasks.tasks?.length)
        return (
            <div>
                <CardList tasks={tasks} />
            </div>
        );
    return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
};

const Mine: FC = () => {
    const { isLoading: isAuthenticating, isLoggedIn } = useAuthenticated();

    return (
        <Layout>
            <Head title="Mine" />
            <div className={classNames.container}>
                {isAuthenticating ? (
                    <Loader />
                ) : isLoggedIn ? (
                    <Content />
                ) : (
                    <div>
                        <p>You are not Authorized</p>
                        <a href={LOGIN_URL} target="_blank" rel="noreferrer">
                            Click here to Login
                        </a>
                    </div>
                )}
            </div>
        </Layout>
    );
};
export default Mine;
