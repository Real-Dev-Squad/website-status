import { FunctionComponent } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';

const Mine: FunctionComponent = () => {
  return (
    <Layout>
      <Helmet>
        <title>Mine | Status Real Dev Squad</title>
      </Helmet>
    </Layout>
  );
}

export default Mine;