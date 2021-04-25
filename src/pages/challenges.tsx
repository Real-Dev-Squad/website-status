import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Active from '@/components/challenges/active';
import Complete from '@/components/challenges/complete';
import Accordion from '@/components/Accordion';
import useFetch from '@/hooks/useFetch';
import { challenge } from '@/components/constants/types';
import classNames from '@/styles/tasks.module.scss';

const CHALLENGES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/challenges`;

function renderCardList(challengeSection: challenge['content'], key:string) {
  if (key === 'Active') {
    return challengeSection.map((item) => <Active content={item} key={item.id} />);
  }
  return challengeSection.map((item) => <Complete content={item} key={item.id} />);
}

const Challenges: FC = () => {
  let challenges: challenge['content'] = [];

  const [filteredChallenge, setFilteredChallenge] = useState<any>([]);

  const { response, error, isLoading } = useFetch(CHALLENGES_URL);

  useEffect(() => {
    if ('challenges' in response) {
      challenges = response.challenges;
      const challengeMap: any = [];
      challenges.forEach((item) => {
        if (item.is_active) {
          if ('Active' in challengeMap) {
            challengeMap.Active = [...challengeMap.Active, item];
          } else {
            challengeMap.Active = [item];
          }
        } else if (!item.is_active) {
          if ('Completed' in challengeMap) {
            challengeMap.Completed = [...challengeMap.Completed, item];
          } else {
            challengeMap.Completed = [item];
          }
        }
      });
      setFilteredChallenge(challengeMap);
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
                Object.keys(filteredChallenge).length > 0
                  ? Object.keys(filteredChallenge).map((key) => (
                    <Accordion open title={key} key={key}>
                      {renderCardList(filteredChallenge[key], key)}
                    </Accordion>
                  )) : (!error && 'No Challenges Found')
              }
            </>
          )
      }
      </div>
    </Layout>
  );
};
export default Challenges;
