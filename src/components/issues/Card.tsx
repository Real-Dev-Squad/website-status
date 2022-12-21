import { FC, useState } from "react";
import styles from "@/components/issues/Card.module.scss";
import { toast, ToastTypes } from '@/helperFunctions/toast';

const TASK_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/`;
import fetch from '@/helperFunctions/fetch';
const { SUCCESS, ERROR } = ToastTypes;


const Card: FC = (props: any) => {
  const { issue } = props;
  const created = new Date(issue.created_at).toDateString();
  const [taskExists, setTaskExists] = useState(Object.keys(issue.taskData).length !== 0);

  const handleClick = async () =>{
    console.log("Task button clicked")
    try {
      const url = TASK_URL;
      const data = {
        title: issue.title,
        type: "task",
        issueId: issue.id,
        status: "Assigned",
        assignee: issue.user.login,
        percentCompleted: 0,
        priority: "Test",
        userData: {
          "createdBy": 123,
          "name": "pankaj"
      }
        }

      const { requestPromise } = fetch({
        url,
        method: 'post',
        data
      });
      const response = await requestPromise;
      toast(SUCCESS, 'Added the task');
      setTaskExists(true);
    } catch (error:any) {
      if ('response' in error) {
        toast(ERROR, error.response.data.message);
        return;
      }
      toast(ERROR, error.message);
    }
  }



  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <div className={styles.card__top__details}>
          <div className={styles.card__top__details__meta_data}>
            <h2> {issue.title}</h2>
            <p>
              Opened on {created} by {issue.user.login}
              <br></br>


            </p>
            <p>{issue.body}</p>
              {issue.assignee != null ? "Assigned to " + issue.assignee.login : ''}
            <p className={styles.card__link} > Issue Link : <a href={issue.html_url}>{issue.html_url}</a> </p>



          </div>

          <div className={styles.label__block}>
            {issue.labels.map((label) => (
        <button className={styles.label}  key={label.id} > {label.name}</button>
      ))}
            </div>
        </div>

        <button className={styles.card__top__button} disabled={taskExists} onClick={handleClick}>Convert to task</button>
        {/* <p> issue.taskData. </p> */}

      </div>
    </div>
  );
};

export default Card;
