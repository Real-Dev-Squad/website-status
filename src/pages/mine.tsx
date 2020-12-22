import { FunctionComponent } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';
import Title from '../components/Title';
import { Helmet } from 'react-helmet';

const Mine: FunctionComponent = () => {
  return (
    <Layout>
      <Helmet>
        <title>Mine</title>
      </Helmet>
      <Navbar page="Mine" />
    </Layout>
  );
}

export default Mine;