import styles from '@/components/Tabs/tabs.module.scss';
import { useAppContext } from '@/context';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import { useTabs } from '@/hooks/useTabs';
import { useContext } from 'react';
import TaskList from '../tasks/TaskList/TaskList';
import task from '@/interfaces/task.type';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { IN_PROGRESS } from '@/components/constants/task-status';
import { TASKS_URL } from '../constants/url';
const { SUCCESS, ERROR } = ToastTypes;

type TabsProps = {
  filteredTasks: task[] | any
  title: string
};

async function updateCardContent(id: string, cardDetails: task) {
  try {
    const { requestPromise } = fetch({
      url: `${TASKS_URL}/${id}`,
      method: 'patch',
      data: cardDetails,
    });
    await requestPromise;
    toast(SUCCESS, 'Changes have been saved !');
  } catch (err: any) {
    if ('response' in err) {
      toast(ERROR, err.response.data.message);
      return;
    }
    toast(ERROR, err.message);
  }
}

export default function Tabs({ filteredTasks, title }: TabsProps) {
  const { state: appState } = useAppContext();
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const isEditable = isUserAuthorized && appState?.isEditMode;
  const { openIndices, toggleIndex } = useTabs();

  return (
    <div>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.tabContainerClassName}>
        {Object.keys(filteredTasks).map((filteredTask: string, index: number) => (
          <button
            key={filteredTask}
            className={`${styles.tabButton} ${openIndices.includes(index) && styles.active
              }`}
            onClick={() => toggleIndex(index)}
          >
            {filteredTask}
          </button>
        ))}
      </div>
      {Object.keys(filteredTasks).map((filteredTask, index) => (
        <div
          key={filteredTask}
          className={`${openIndices.includes(index) ? styles.open : styles.closed
            }`}
        >
          <TaskList tasks={filteredTasks[filteredTask as keyof typeof filteredTasks]}
            isEditable={isEditable}
            updateCardContent={updateCardContent}
            hasLimit={filteredTask == IN_PROGRESS}
            taskKey={filteredTask}
          />
        </div>
      ))}
    </div>
  )
}