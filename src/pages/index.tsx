import { Component } from 'react';
import Layout from '../components/Layout';
import Menu from '../components/menu';

class Index extends Component<any> {
  render() {
    return (
      <Layout>
        <Menu page="Index" />
      </Layout>
    );
  }
}

export default Index;
