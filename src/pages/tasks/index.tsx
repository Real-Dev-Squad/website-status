import Head from '@/components/head';
import Layout from '@/components/Layout';
import styles from '@/styles/tasks.module.scss';
import { TasksContent } from '@/components/tasks/TasksContent';
import { NextPageContext } from 'next';

function Tasks({ dev }: { dev?: boolean }) {
    return (
        <Layout>
            <Head title="Tasks" />

            <div className={styles.container}>
                <TasksContent dev={dev} />
            </div>
        </Layout>
    );
}

Tasks.getInitialProps = async (ctx: NextPageContext) => {
    const dev = ctx.query.dev === 'true';
    return { dev };
};

export default Tasks;
