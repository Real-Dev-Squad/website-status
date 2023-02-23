import React, { FC, useState } from 'react'
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Tabs from '@/components/Tabs/Tabs';
import { TABS } from '@/components/tasks/constants';

const Test: FC = () => {
  const [activeTab, setActiveTab] = useState('ASSIGNED')
  function onSelect(tab: string) {
    setActiveTab(tab);
  }
  return (
    <Layout>
      <Head title='Tasks' />
      <div className='container'>
        <Tabs tabs={TABS} onSelect={onSelect} activeTab={activeTab} />
        <p data-testid='selectedTab'>{activeTab}</p>
      </div>
    </Layout>
  );
}

export default Test