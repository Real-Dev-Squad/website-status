import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Active from '@/components/challenges/active';
import Complete from '@/components/challenges/complete';
import Accordion from '@/components/Accordion';
import useFetch from '@/hooks/useFetch';
import challenge from '@/interfaces/challenge.type';
import classNames from '@/styles/tasks.module.scss';

const CHALLENGES_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/challenges`;

const renderCardList = (challengeSection: challenge['content'], key:string) => {
  if (key === 'Active') {
    return challengeSection.map((item) => <Active content={item} key={item.id} />);
  }
  return challengeSection.map((item) => <Complete content={item} key={item.id} />);
};

const Challenges: FC = () => {
  let challenges: challenge['content'] = [];

  const [filteredChallenge, setFilteredChallenge] = useState<any>([]);

  const { response, error, isLoading } = useFetch(CHALLENGES_URL);

  useEffect(() => {
    if ('challenges' in response) {
      challenges = response.challenges;
      const challengeMap: any = [];

      challengeMap.Active = challenges.filter((task) => task.is_active);
      challengeMap.Completed = challenges.filter((task) => !task.is_active);

      setFilteredChallenge(challengeMap);
    }
  }, [isLoading, response]);

  return (
    <Layout>
      <Head title="Challenges" />

      <div className={classNames.container}>
        {
          !!error
          && (error?.response?.data?.statusCode === 401 ? (
            <div>
              <p>You are not Authorized</p>
              <a
                href="https://github.com/login/oauth/authorize?client_id=c4a84431feaf604e89d1"
                target="_blank"
                rel="noreferrer"
              >
                Click here to Login
              </a>
            </div>
          ) : <div><p>Something went wrong! Please contact admin</p></div>)
        }
        {
        isLoading
          ? (
            <p>Loading...</p>
          ) : (
            <>
              {
                Object.keys(filteredChallenge).length > 0
                  ? Object.keys(filteredChallenge).map((key) => (
                    filteredChallenge[key].length > 0
                    && (
                    <Accordion open title={key} key={key}>
                      {renderCardList(filteredChallenge[key], key)}
                    </Accordion>
                    )

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
