import { FC, Fragment } from 'react';
import styles from '@/components/storyCard/storyCard.module.scss';
import TaskType from '@/interfaces/task.type';

interface TaskProps {
  title: string,
  status: string,
}

type Owner = {
  name: string,
  img: string,
}

export type Props = {
  data: {
    title: string,
    description: string,
    subtasks: TaskType[],
    status: string,
    started: string,
    dueDate: string,
    owners: {
      backend?: Owner,
      frontend?: Owner,
      feature?: Owner
    }
  }
}

const Task: FC<TaskProps> = ({ title, status }) => (
  <div className={styles.subtask}>
    <span className={styles.subtaskTitle}>{title}</span>
    <span className={styles.subtaskStatus}>{status}</span>
  </div>
);

const ownerInfo = (type: string, owner?: Owner) => {
  let ownerEl = (
    <div className={styles.toBeDecided}>
      <p>TBD</p>
    </div>
  );

  if (owner) {
    ownerEl = (
      <img
        className={styles.ownerImage}
        src={owner.img}
        alt={owner.name}
      />
    );
  }

  return (
    <div className={styles.ownerInfo}>
      <p>{`${type} Engineer:`}</p>
      {ownerEl}
    </div>
  );
};

const StoryCard: FC<Props> = ({ data }) => {
  const {
    title, description, subtasks, status, owners, started, dueDate,
  } = data;

  return (
    <div className={styles.container}>
      <div className={styles.taskInfo}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.subtasks}>
          {subtasks.map((task) => (
            <Fragment key={task.id}>
              <Task title={task.title} status={task.status} />
            </Fragment>
          ))}
        </div>
        <div className={styles.dateInfo}>
          <div className={styles.taskStarted}>
            Started
            {started}
          </div>
          <div className={styles.taskDue}>
            <img src="/calendar-icon.png" alt="calendar-icon" height="25" />
            Due Date
            <span className={styles.dueDate}>{dueDate}</span>
          </div>
        </div>
      </div>
      <div className={styles.taskStatus}>
        <div className={styles.statusInfo}>
          Status:
          {status === 'Active'
            ? <span className={styles.subtaskStatus}>{status}</span>
            : <img src="/lock-solid.svg" alt="lock-icon" height="30" />}
        </div>
        <div>
          {ownerInfo('Feature', owners.feature)}
          {ownerInfo('Backend', owners.backend)}
          {ownerInfo('Frontend', owners.frontend)}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
