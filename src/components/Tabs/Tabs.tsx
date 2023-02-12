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
function Temps({ filteredTasks, title }) {
  const { state: appState } = useAppContext();
  const { isEditMode } = appState;
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const isEditable = isUserAuthorized && isEditMode;
  const { openIndices, toggleIndex } = useTabs()
  return (
    <div>
      <h1 className={styles.heading}>{ title }</h1>
      <div style={{ display: 'flex' }} className={styles.tabContainerClassName}>
        {Object.keys(filteredTasks).map((item, index) => (
          <button
            key={item}
            className={`${styles.tabButton} ${openIndices.includes(index) && styles.active
              }`}
            onClick={() => toggleIndex(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <div
        style={{
          position: 'relative',
          minHeight: 120,
        }}
      >
        {Object.keys(filteredTasks).map((item, index) => (
          <div
            key={index}
            className={`${styles.tabItem} ${openIndices.includes(index) ? styles.open : styles.closed
              }`}
          >
            <TaskList tasks={filteredTasks[item]} isEditable={isEditable} updateCardContent={updateCardContent} hasLimit={item == IN_PROGRESS} taskKey={item} />
            {/* <p>Hi, I am
              {item}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Temps