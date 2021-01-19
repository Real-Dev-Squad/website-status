import { FC } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import Section from '@/components/tasks/section';
import pullRequests from '../mocks/pullRequests.json';

const Index: FC = () => {
  const completedTasks = pullRequests.filter(
    (pr) => pr.completionStatus === 'completed',
  );
  const incompleteTasks = pullRequests.filter(
    (pr) => pr.completionStatus !== 'completed',
  );

  return (
    <Layout>
      <Helmet>
        <title>Tasks | Status Real Dev Squad</title>
      </Helmet>

      <div className="container">
        <Section heading="Active" content={incompleteTasks} />
        <Section heading="Completed" content={completedTasks} />
      </div>
    </Layout>
  );
};

export default Index;
