import { FunctionComponent } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';
import Title from '../components/Title';

const Mine: FunctionComponent = () => {
  return (
    <Layout>
      <Navbar page="Mine" />
      <Title>This is about page</Title>
    </Layout>
  );
}

export default Mine;