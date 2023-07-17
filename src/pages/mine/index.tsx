import { FC } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import { LOGIN_URL } from '@/constants/url';
import { NO_TASKS_FOUND_MESSAGE } from '@/constants/messages';
import useAuthenticated from '@/hooks/useAuthenticated';
import { useGetMineTasksQuery } from '@/app/services/tasksApi';
import { Loader } from '@/components/tasks/card/Loader';
import { loginNode } from '../challenges';

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
    const { data: tasks, error, isLoading } = useGetMineTasksQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong! Please contact admin</p>;
    if (tasks && tasks.length)
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
                        {loginNode}
                    </div>
                )}
            </div>
        </Layout>
    );
};
export default Mine;
