import beautifyTaskStatus from "@/helperFunctions/beautifyTaskStatus";
import task from "@/interfaces/task.type";
import { useState } from "react";
import Card from "../card";
import styles from "../card/card.module.scss";

type TaksListProps = {
  tasks: task[];
  isEditable?: boolean;
  hasLimit?: boolean;
  updateCardContent?: (id: string, cardDetails: task) => void;
};

export default function TaskList({
  tasks,
  updateCardContent,
  isEditable = false,
  hasLimit = false,
}: TaksListProps) {
  const initialTasksLimit = hasLimit ? 3 : tasks.length;
  const beautifiedTasks = beautifyTaskStatus(tasks);
  const [tasksLimit, setTasksLimit] = useState<number>(initialTasksLimit);
  const filteredTasks = getFilteredTasks();
  function getFilteredTasks() {
    if (!hasLimit) return beautifiedTasks;
    return beautifiedTasks.slice(0, tasksLimit);
  }
  function onSeeMoreTasksHandler() {
    setTasksLimit((prevLimit) => prevLimit + 5);
  }

  return (
    <>
      {filteredTasks.map((item: task) => (
        <Card
          content={item}
          key={item.id}
          shouldEdit={isEditable}
          onContentChange={async (id: string, newDetails: any) =>
            isEditable && updateCardContent?.(id, newDetails)
          }
        />
      ))}
      {hasLimit && filteredTasks.length != beautifiedTasks.length && (
        <button
          type="button"
          onClick={onSeeMoreTasksHandler}
          className={styles.seeMoreTasks}
        >
          See More
        </button>
      )}
    </>
  );
}
