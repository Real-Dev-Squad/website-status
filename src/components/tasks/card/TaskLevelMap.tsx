import classNames from '@/components/tasks/card/card.module.scss';
import taskItem from '@/interfaces/taskItem.type';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
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
    // const isUserAuthorized = useContext(isUserAuthorizedContext);
    const userData = useSelector((state: any) => state.user);
    const adminData = userData.adminUser;
    const superUserData = userData.superUser;
    const isUserAuthorized = !!adminData || !!superUserData;

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
