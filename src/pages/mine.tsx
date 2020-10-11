import classNames from './index.scss';
import { Component } from 'react';
import Layout from '../components/Layout';
import Menu from '../components/Menu';
import Title from '../components/Title';

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
