import { FunctionComponent } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';
import Section from '../components/tasks/section';
import pullRequests from '../../mock/pullRequests';

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
      <Navbar page="Tasks" />
      <div className="container">
        <Section heading='Active' content={incompleteTasks} />
        <Section heading='Completed' content={completedTasks} />
      </div>
    </Layout>
  );
}

export default Index;
