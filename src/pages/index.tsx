import { Component } from 'react';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Menu from '../components/Menu';

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
