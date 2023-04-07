import { FC, useEffect, useContext } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import Tabs from '@/components/Tabs';
import { Tab } from '@/interfaces/task.type';
import {
  ASSIGNED,
  COMPLETED,
  AVAILABLE,
  IN_PROGRESS,
  SMOKE_TESTING,
  NEEDS_REVIEW,
  IN_REVIEW,
  APPROVED,
  MERGED,
  SANITY_CHECK,
  REGRESSION_CHECK,
  RELEASED,
  VERIFIED,
  BLOCKED,
} from '@/components/constants/task-status';
import {TASKS_FETCH_ERROR_MESSAGE, NO_TASKS_FOUND_MESSAGE} from '@/components/constants/messages';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { useAppContext } from '@/context';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import { useTasksContext } from '@/context/tasks.context';
import TaskList from '@/components/tasks/TaskList/TaskList';
import { TASKS_URL } from '@/components/constants/url';

const STATUS_ORDER = [
  ASSIGNED,
  COMPLETED,
  BLOCKED,
  AVAILABLE,
  IN_PROGRESS,
  SMOKE_TESTING,
  NEEDS_REVIEW,
  IN_REVIEW,
  APPROVED,
  MERGED,
  SANITY_CHECK,
  REGRESSION_CHECK,
  RELEASED,
  VERIFIED,
];
const statusActiveList = [
  IN_PROGRESS,
  BLOCKED,
  SMOKE_TESTING,
];



const Index: FC = () => {
  const { state: appState } = useAppContext();  
  const { filteredTasks, setFilteredTasks, activeTab, setActiveTab, updateCardContent } = useTasksContext()
  const { response, error, isLoading } = useFetch(TASKS_URL);
  const { isEditMode } = appState;
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const isEditable = isUserAuthorized && isEditMode;

  const onSelect = (tab: Tab) => {
    setActiveTab(tab);
  }
  
  useEffect(() => {
    if ('tasks' in response) {
      const tasks = updateTasksStatus(response.tasks);
      tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);
      tasks.sort((a: task, b: task) => STATUS_ORDER.indexOf(a.status)
        - STATUS_ORDER.indexOf(b.status));
      const taskMap: any = [];
      tasks.forEach((item) => {
        if (item.status in taskMap) {
          taskMap[item.status] = [...taskMap[item.status], item];
        } else {
          taskMap[item.status] = [item];
        }
      });
      setFilteredTasks(taskMap);
    }

    return(() => {
      setFilteredTasks(null);
    });
  }, [isLoading, response]);

  console.log(filteredTasks && filteredTasks[activeTab], filteredTasks)
  
  const renderTabSection = () => (
    <div className={classNames.tabsContainer}>
      <Tabs
        tabs={Object.values(Tab) as Tab[]}
        onSelect={onSelect}
        activeTab={activeTab}
      />
    </div>
  );

  const renderTaskList = () => (
    <div>
      {(filteredTasks && filteredTasks[activeTab]) ? (
        <TaskList
          tasks={filteredTasks[activeTab]}
          isEditable={isEditable}
          updateCardContent={updateCardContent}
        />
      ) : (
        <p>{NO_TASKS_FOUND_MESSAGE}</p>
      )}
    </div>
  );
  return (
    <Layout>
      <Head title='Tasks' />
          <div className={classNames.container}>
            {!!error && <p>{TASKS_FETCH_ERROR_MESSAGE}</p>}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {(filteredTasks && Object.keys(filteredTasks).length > 0)
                  ? <div className={classNames.tasksContainer}>
                    {renderTabSection()}
                    {renderTaskList()}
                  </div>
                  : !error && <p>{NO_TASKS_FOUND_MESSAGE}</p>}
              </>
            )}
          </div>
    </Layout>
  );
};

export default Index;
