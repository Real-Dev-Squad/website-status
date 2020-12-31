import { FC } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';

const Mine: FC = () => (
  <Layout>
    <Helmet>
      <title>Mine | Status Real Dev Squad</title>
    </Helmet>
    <Navbar page="Mine" />
  </Layout>
);

export default Mine;
