import { FC, useState, useEffect, useContext } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import Accordion from '@/components/Accordion';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
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
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { useAppContext } from '@/context';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import { TasksProvider } from '@/context/tasks.context';
import TaskList from '@/components/tasks/TaskList/TaskList';
import { TASKS_URL } from '@/components/constants/url';
import { NO_TASKS_FOUND_MESSAGE, TASKS_FETCH_ERROR_MESSAGE } from '@/components/constants/error-messages';
import Tabs from '@/components/Tabs';
import { Tab } from '@/interfaces/task.type';

const { SUCCESS, ERROR } = ToastTypes;
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

const EmptyTaskListLabel:React.FC = ()=>{
  return <p className={classNames.emptyTaskListLabel}>{NO_TASKS_FOUND_MESSAGE}</p>;
}

const Index: FC = () => {
  const { state: appState } = useAppContext();  
  const [filteredTask, setFilteredTask] = useState<{[key:string]: task[]}>({});
  const { response, error, isLoading } = useFetch(TASKS_URL);
  const { isEditMode } = appState;
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const isEditable = isUserAuthorized && isEditMode;
  const [activeTab, setActiveTab] = useState(Tab.ASSIGNED)
  
  const onSelect = (tab: Tab) => {
    setActiveTab(tab);
  }

  useEffect(() => {
    if ('tasks' in response) {
      const tasks = updateTasksStatus(response.tasks);
      tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);
      tasks.sort((a: task, b: task) => STATUS_ORDER.indexOf(a.status)
        - STATUS_ORDER.indexOf(b.status));
      const taskMap = tasks.reduce<{[key:string]: task[]}>((taskGroups,task) => {
        if (task.status in taskGroups) {
          taskGroups[task.status] = [...taskGroups[task.status], task];
        } else {
          taskGroups[task.status] = [task];
        }
        return taskGroups;
      },{});
      setFilteredTask(taskMap);
    }

    return(() => {
      setFilteredTask({});
    });
  }, [isLoading, response]);

  return (
    <Layout>
      <Head title='Tasks' />
        <TasksProvider >
          <div className={classNames.container}>
            {!!error && <p>{TASKS_FETCH_ERROR_MESSAGE}</p>}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {Object.keys(filteredTask).length > 0
                  ? <div className={classNames.tasksContainer}>
                      <div className={classNames.tabsContainer}>
                        <Tabs tabs={Object.values(Tab) as Tab[]} onSelect={onSelect} activeTab={activeTab}/>
                      </div>
                      <div>
                        {filteredTask[activeTab] ? <TaskList tasks={filteredTask[activeTab]} isEditable={isEditable} updateCardContent={updateCardContent}/>
                        :<EmptyTaskListLabel/>}
                      </div>
                    </div>
                  : !error && <EmptyTaskListLabel/>}
              </>
            )}
          </div>
      </TasksProvider>
    </Layout>
  );
};

export default Index;
