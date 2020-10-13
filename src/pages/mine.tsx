import { Component } from 'react';
import Layout from '../components/Layout';
import Menu from '../components/menu';
import Title from '../components/title';

class Mine extends Component<any> {
  render() {
    return (
      <Layout>
        <Menu page="Mine" />
        <Title>This is about page</Title>
      </Layout>
    );
  }
}

export default Mine;
