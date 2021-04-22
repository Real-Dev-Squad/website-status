import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Section from '@/components/section';
import { CHALLENGES_SCREEN } from '@/components/constants/display-sections.js';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';

const CHALLENGES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/challenges`;

const Challenges: FC = () => {
  let challenges:any[] = [];
  const [filterChallenge, setFilterChallenge] = useState<any>([]);

  const { response, error, isLoading } = useFetch(CHALLENGES_URL);

  useEffect(() => {
    if ('challenges' in response) {
      challenges = response.challenges;
      setFilterChallenge(challenges);
    }
  }, [isLoading, response]);

  return (
    <Layout>
      <Head title="Challenges" />
      <div className={classNames.container}>
        {!!error && <p>Something went wrong, please contact admin!</p>}
        {
          isLoading
            ? (
              <p>Loading...</p>
            ) : (
              <>
                {
                 filterChallenge.length > 0
                   ? (
                     <div>
                       <Section content={filterChallenge} screen={CHALLENGES_SCREEN} />
                     </div>
                   )
                   : (!error && 'No Tasks Found')
                }
              </>
            )
        }
      </div>
    </Layout>
  );
};

export default Challenges;
