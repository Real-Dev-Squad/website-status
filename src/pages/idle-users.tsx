import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Section from '@/components/idleUsers/section';
import Layout from '@/components/Layout';
import useFetch from '@/hooks/useFetch';
import { IDLE_USERS_URL } from '@/components/constants/url';
import { idleUser } from '@/interfaces/idleUser.type';

const IdleUsers: FC = () => {
  const [idleUsersList, setIdleUsersList] = useState<idleUser[]>([]);

  const {
    response,
    error,
    isLoading,
  } = useFetch(IDLE_USERS_URL);

  useEffect(() => {
    if ('allUserStatus' in response) {
      const idleUsers = response.allUserStatus;
      setIdleUsersList(idleUsers);
    }
  }, [isLoading, response]);

  return (
    <Layout>
      <Head title="Idle Users | Status Real Dev Squad" />

      <div className="container">
        <Section heading="Idle Users" content={idleUsersList} error={error} isLoading={isLoading} />
      </div>

    </Layout>
  );
};

export default IdleUsers;
