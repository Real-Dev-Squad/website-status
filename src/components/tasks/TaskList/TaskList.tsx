import Card from '../card';
import task from '@/interfaces/task.type';
import styles from '../card/card.module.scss';
import { useUpdateTaskMutation } from '@/app/services/tasksApi';

type TaskListProps = {
    tasks: task[];
};

export default function TaskList({ tasks }: TaskListProps) {
    const [updateCardContent] = useUpdateTaskMutation();
    async function onContentChangeHandler(id: string, cardDetails: any) {
        if (!updateCardContent) return;
        updateCardContent({ id, task: cardDetails });
    }

    return (
        <div className={styles.taskCardsContainer}>
            {tasks.map((item: task) => (
                <Card
                    content={item}
                    key={item.id}
                    shouldEdit
                    onContentChange={onContentChangeHandler}
                />
            ))}
        </div>
    );
}
