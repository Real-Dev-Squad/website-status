import { useState } from 'react'
import Card from '../card'
import task from '@/interfaces/task.type'
import beautifyTaskStatus from '@/helperFunctions/beautifyTaskStatus'
import {
  SEE_MORE,
  INITIAL_TASKS_LIMIT,
  ADD_MORE_TASKS_LIMIT,
} from '../constants'
import styles from '../card/card.module.scss'

type TaksListProps = {
  tasks: task[];
  isEditable?: boolean;
  hasLimit?: boolean;
  updateCardContent?: (id: string, cardDetails: task) => void;
  taskKey?: string
};

type FilterTasksProps = {
  hasLimit?: boolean
  tasksLimit: number
  tasks: task[]
}

function getFilteredTasks({
  hasLimit,
  tasksLimit,
  tasks,
}: FilterTasksProps) {
  if (!hasLimit) return tasks
  return tasks.slice(0, tasksLimit)
}

export default function TaskList({
  tasks,
  updateCardContent,
  isEditable = false,
  hasLimit = false,
  taskKey
}: TaksListProps) {
  const initialTasksLimit = hasLimit ? INITIAL_TASKS_LIMIT : tasks.length;
  const beautifiedTasks = beautifyTaskStatus(tasks);
  const [tasksLimit, setTasksLimit] = useState<number>(initialTasksLimit);
  const filteredTasks = getFilteredTasks({tasks: beautifiedTasks, hasLimit, tasksLimit});
  function onSeeMoreTasksHandler() {
    setTasksLimit((prevLimit) => prevLimit + ADD_MORE_TASKS_LIMIT);
  }
  async function onContentChangeHandler(id: string, cardDetails: any){
    if(!isEditable || !updateCardContent) return;
    updateCardContent(id, cardDetails);
  }
  
  if (!tasks || !tasks?.length) {
    return <div>
      No {taskKey} tasks found
    </div>
  }

  return (
    <>
      {filteredTasks.map((item: task) => (
        <Card
          content={item}
          key={item.id}
          shouldEdit={isEditable}
          onContentChange={onContentChangeHandler}
        />
      ))}
      {hasLimit && filteredTasks.length != beautifiedTasks.length && (
        <button
          type="button"
          onClick={onSeeMoreTasksHandler}
          className={styles.seeMoreTasks}
        >
          {SEE_MORE}
        </button>
      )}
    </>
  );
}
