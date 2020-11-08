import Layout from '../components/Layout';
import Navbar from '../components/navbar';
import Title from '../components/title';
import Section from '../components/tasks/section'
import pullRequests from '../../mock/pullRequests'
const Tasks = () => {
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
      <style jsx>{`
        .container {
          font-family: roboto;
          // Move the font-family to html
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: flex-start;
          flex-wrap: wrap;
        }
      `}</style>
      <Navbar page="Tasks" />
      <Title>This is Tasks page</Title>
      <div className="container">
        <Section heading='Active' content={incompleteTasks} />
        <Section heading='Completed' content={completedTasks} />
      </div>
    </Layout>
  );
}

export default Tasks;
