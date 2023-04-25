import { FC, useState, useContext, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import classNames from '@/styles/tasks.module.scss';
import { TasksContent } from '@/components/tasks/TasksContent';

const Index: FC = () => {
    return (
        <Layout>
            <Head title="Tasks" />

            <div className={classNames.container}>
                <TasksContent />
            </div>
        </Layout>
    );
};

export default Index;
