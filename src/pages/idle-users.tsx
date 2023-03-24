import Head from '@/components/head';
import Section from '@/components/idleUsers/section';
import Layout from '@/components/Layout';
import { FC } from 'react';
import { useGetIdleStatusQuery } from 'slices/apiSlice';

const IdleUsers: FC = () => {
  const {
    data: idleUsersList = [],
    isError,
    isLoading,
  } = useGetIdleStatusQuery('IDLE');

  return (
    <Layout>
      <Head title='Idle Users | Status Real Dev Squad' />

      <div className='container'>
        <Section
          heading='Idle users'
          content={idleUsersList}
          isLoading={isLoading}
          error={isError}
        />
      </div>
    </Layout>
  );
};

export default IdleUsers;
