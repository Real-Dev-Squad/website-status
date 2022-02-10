import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Active from '@/components/challenges/active';
import Complete from '@/components/challenges/complete';
import Accordion from '@/components/Accordion';
import useFetch from '@/hooks/useFetch';
import challenge from '@/interfaces/challenge.type';
import userType from '@/interfaces/user.type';
import classNames from '@/styles/tasks.module.scss';
import { CHALLENGES_URL } from '@/components/constants/url';
import { setCookie, checkThemeHistory, getDefaultOrTransferDark } from '@/helperFunctions/themeHistoryCheck';
import userData from '@/helperFunctions/getUser';

const renderCardList = (challengeSection: challenge['content'], key:string, userId: string, darkMode: boolean) => {
  if (key === 'Active') {
    return challengeSection.map((item) => <Active content={item} key={item.id} userId={userId} setDarkMode={darkMode} />);
  }
  return challengeSection.map((item) => <Complete content={item} key={item.id} setDarkMode={darkMode}/>);
};

const Challenges: FC = () => {
  const router = useRouter();
  const { query } = router;
  const [filteredChallenge, setFilteredChallenge] = useState<any>([]);
  const [user, setUser] = useState<userType>(Object);
  const { response, error, isLoading } = useFetch(CHALLENGES_URL);
  const [mainDarkMode, setMainDarkMode] = useState(getDefaultOrTransferDark(query))


  const themeSetter = () => {
    document.cookie = setCookie(!mainDarkMode);
    setMainDarkMode(!mainDarkMode);
  }

  useEffect(() => {
    setMainDarkMode(checkThemeHistory(document.cookie, query) === "dark");
    (async () => {
      setUser(await userData());
    })();
  }, []);

  useEffect(() => {
    if ('challenges' in response) {
      let challenges: challenge['content'] = response.challenges;
      const challengeMap: any = [];

      challengeMap.Active = challenges.filter((task) => task.is_active);
      challengeMap.Completed = challenges.filter((task) => !task.is_active);

      setFilteredChallenge(challengeMap);
    }
  }, [isLoading, response]);

  return (
    <Layout changeTheme={themeSetter} darkMode={mainDarkMode}>
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
                      {renderCardList(filteredChallenge[key], key, user.id, mainDarkMode)}
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
