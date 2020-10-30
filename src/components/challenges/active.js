import { useState } from 'react';
import classNames from './styles.module.scss';
import Label from '../label/label';

const Active = ({ content }) => {
  const [state, setState] = useState({
    is_user_subscribed: content.is_user_subscribed,
  });

  const subscribeEventHandler = async () => {
    const JSONInfo = { challenge_id: 1, user_id: 2 };
    // let response = await fetch(
    //   'https://staging-api.realdevsquad.com/challenge/subscribe',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(JSONInfo),
    //     credentials: 'include',
    //   }
    // );
    // if (response.status == 200) {
    //   const responseData = await response.json();
    //   console.log(responseData);
    // }
    setState({
      ...state,
      is_user_subscribed: 1,
    });
  };

  return (
    <div className={classNames.boxConent}>
      <p className={classNames.heading}>{content.title}</p>
      <Label text='Level' value={content.level} />
      <Label text='Challenge Started' value={content.start_date} />
      <Label text='Challenge Ends' value={content.end_date} />
      <Label text='Active Participants' value={content.participants.length} />
      {!state.is_user_subscribed ? (
        <p className={classNames.activeBtn}>
          <button onClick={subscribeEventHandler}>I will do this</button>
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export default Active;
