import { Component } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';
import Title from '../components/title';

class Mine extends Component<any> {
  render() {
    return (
      <Layout>
        <Navbar page="Mine" />
        <Title>This is about page</Title>
      </Layout>
    );
  }
}

export default Mine;
