import Head from '@/components/head';
import Layout from '@/components/Layout';
import classNames from '@/styles/tasks.module.scss';
import { TasksContent } from '@/components/tasks/TasksContent';
import { NextPageContext } from 'next';

function Tasks() {
    return (
        <Layout>
            <Head title="Tasks" />

            <div className={classNames.container}>
                <TasksContent />
            </div>
        </Layout>
    );
}

Tasks.getInitialProps = async (ctx: NextPageContext) => {
    const dev = ctx.query.dev === 'true';
    return { dev };
};

export default Tasks;
