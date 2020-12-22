import { FunctionComponent } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';

const Mine: FunctionComponent = () => {
  return (
    <Layout>
      <Helmet>
        <title>Mine | Status Real Dev Squad</title>
      </Helmet>
      <Navbar page="Mine" />
    </Layout>
  );
}

export default Mine;