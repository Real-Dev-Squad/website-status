import beautifyTaskStatus from "@/helperFunctions/beautifyTaskStatus";
import task from "@/interfaces/task.type";
import Card from "../card";

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
  hasLimit=false,
}: TaksListProps) {
  const beautifiedTasks = beautifyTaskStatus(tasks);

  return (
    <>
    {beautifiedTasks.map((item: task) => (
    <Card
      content={item}
      key={item.id}
      shouldEdit={isEditable}
      onContentChange={async (id: string, newDetails: any) =>
        isEditable && updateCardContent?.(id, newDetails)
      }
    />
  ))}
    </>
  )
}
