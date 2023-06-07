import classNames from '@/components/tasks/card/card.module.scss';
import useUserData from '@/hooks/useUserData';
import taskItem from '@/interfaces/taskItem.type';

type Props = {
    taskTagLevel?: taskItem[];
    itemId: string;
    shouldEdit: boolean;
    deleteTaskTagLevel: any;
};
export const TaskLevelMap = ({
    taskTagLevel,
    shouldEdit,
    itemId,
    deleteTaskTagLevel,
}: Props) => {
    const { isUserAuthorized } = useUserData();
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
                                    deleteTaskTagLevel({
                                        taskItemToDelete: item,
                                        itemId,
                                    })
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
