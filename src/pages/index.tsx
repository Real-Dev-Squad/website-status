import { FunctionComponent } from 'react';
import Layout from 'components/Layout';
import Section from 'components/tasks/section';
import pullRequests from 'mocks/pullRequests.json';
import { Helmet } from 'react-helmet';
const Index: FunctionComponent = () => {
  const completedTasks = pullRequests.filter((pr) => {
    if (pr.completionStatus === 'completed') {
      return pr
    }
  })

  const incompleteTasks = pullRequests.filter((pr) => {
    if (pr.completionStatus !== 'completed') {
      return pr
    }
  })
  return (
    <Layout>
      <Helmet>
        <title>Tasks | Status Real Dev Squad</title>
      </Helmet>
      <div className="container">
        <Section heading='Active' content={incompleteTasks} />
        <Section heading='Completed' content={completedTasks} />
      </div>
    </Layout>
  );
}

export default Index;
