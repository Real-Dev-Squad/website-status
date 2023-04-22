import classNames from '@/components/tasks/card/card.module.scss';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import taskItem from '@/interfaces/taskItem.type';
import { useContext } from 'react';
type Props = {
    taskTagLevel?: taskItem[];
    updateTaskTagLevel: (
        taskItemToUpdate: taskItem,
        method: 'delete' | 'post'
    ) => void;
    shouldEdit: boolean;
};
export const TaskLevelMap = ({
    taskTagLevel,
    shouldEdit,
    updateTaskTagLevel,
}: Props) => {
    const isUserAuthorized = useContext(isUserAuthorizedContext);

    return (
        <div className={classNames.taskTagLevelContainer}>
            {taskTagLevel?.map((item) => (
                <span
                    key={item.tagId}
                    className={classNames.taskTagLevel}
                    data-testid="tag-name"
                >
                    {item.tagName}
                    <small data-testid="level">
                        <b>LVL:{item.levelValue}</b>
                    </small>
                    {shouldEdit && isUserAuthorized && (
                        <span>
                            <button
                                data-testid="delete-btn"
                                className={classNames.removeTaskTagLevelBtn}
                                onClick={() =>
                                    updateTaskTagLevel(item, 'delete')
                                }
                            >
                                &#10060;
                            </button>
                        </span>
                    )}
                </span>
            ))}
        </div>
    );
};
