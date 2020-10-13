import { Component } from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/navbar';

class Index extends Component<any> {
  render() {
    return (
      <Layout>
        <Navbar page="Index" />
      </Layout>
    );
  }
}

export default Index;
