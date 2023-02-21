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
  filteredTasks: Record<string,task[]>
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
      const message = err?.response?.data?.message ?? err.message;
      toast(ERROR, message);
      return;
    }
    toast(ERROR, err.message);
  }
}

export default function Tabs({ filteredTasks, title }: TabsProps) {
  const { state: appState } = useAppContext();
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const { openTabs, toggleTab } = useTabs();
  
  const isEditable = isUserAuthorized && appState?.isEditMode;

  const tabHeaders = Object.keys(filteredTasks);

  const tabButtons = tabHeaders.map((filteredTasksKey: string, index: number) => (
    <button
      key={filteredTasksKey}
      className={`${styles.tabButton} ${openTabs.includes(index) && styles.active
        }`}
      onClick={() => toggleTab(index)}
    >
      {filteredTasksKey}
    </button>
  ))

  const tabContent = tabHeaders.map((filteredTasksKey: string, index: number) => (
    <div
      key={filteredTasksKey}
      className={`${openTabs.includes(index) ? styles.open : styles.closed
        }`}
    >
      <TaskList tasks={filteredTasks[filteredTasksKey as keyof typeof filteredTasks]}
        isEditable={isEditable}
        updateCardContent={updateCardContent}
        hasLimit={filteredTasksKey === IN_PROGRESS}
        taskKey={filteredTasksKey}
      />
    </div>
  ))

  return (
    <div>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.tabContainerClassName}>
        {tabButtons}
      </div>
      {tabContent}
    </div>
  )
}