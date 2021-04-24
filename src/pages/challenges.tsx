import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Active from '@/components/challenges/active';
import Complete from '@/components/challenges/complete';
import Accordion from '@/components/Accordion';
import { CHALLENGES_SCREEN } from '@/components/constants/display-sections.js';
import useFetch from '@/hooks/useFetch';
import { IndexProps } from '@/components/constants/types';
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

  const section = (sectionContent:IndexProps['content'], screen:IndexProps['screen']) => {
    let activeContent;
    let completeContent;

    if (screen === CHALLENGES_SCREEN) {
      activeContent = sectionContent
        .filter((challenge) => challenge.is_active)
        .map((activeChallenge) => (
          <Active key={activeChallenge.id} content={activeChallenge} />
        ));
      completeContent = sectionContent
        .filter((challenge) => !challenge.is_active)
        .map((completedChallenge) => (
          <Complete key={completedChallenge.id} content={completedChallenge} />
        ));
    }
    return (
      <section className={classNames.section}>
        <div className={classNames.active}>
          <Accordion open title="Active">
            {activeContent}
          </Accordion>
        </div>
        <div className={classNames.complete}>
          <Accordion open title="Completed">
            {completeContent}
          </Accordion>
        </div>
      </section>
    );
  };

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
                       {section(filterChallenge, CHALLENGES_SCREEN)}
                     </div>
                   )
                   : (!error && 'No Challenges Found')
                }
              </>
            )
        }
      </div>
    </Layout>
  );
};

export default Challenges;
