import { FC, useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { dragDropProps } from '@/interfaces/availabilityPanel.type';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import task from '@/interfaces/task.type';
import fetch from '@/helperFunctions/fetch';
import { ASSIGNED } from '@/components/constants/task-status';
import DroppableComponent from './DroppableComponent';

type NotFoundErrorProps = {
  message: string,
};

const { SUCCESS, ERROR } = ToastTypes;

const NotFoundError:FC<NotFoundErrorProps> = ({ message = 'Not found' }) => (
  <div className={classNames.emptyArray}>
    <img src="ghost.png" alt="ghost" />
    <span className={classNames.emptyText}>
      {message}
    </span>
  </div>
);

const DragDropcontext: FC<dragDropProps> = ({
  unAssignedTasks,
  idleMembers,
  refreshData,
}) => {
  const [toogleSearch, setToogleSearch] = useState<boolean>(false);
  const [toogleSearchName, setToogleSearchName] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Array<task>>(unAssignedTasks);
  const [memberList, setMemberList] = useState<Array<string>>(idleMembers);
  const [isTaskOnDrag, setIsTaskOnDrag] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    setTaskList(unAssignedTasks);
    setMemberList(idleMembers);
  }, [unAssignedTasks, idleMembers]);

  const reorder = (list:Array<task |string>, startIndex:number, endIndex:number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragStart = (result:DragEvent | any) => {
    const isTask = result.source.droppableId === 'tasks';
    if (isTask) {
      setIsTaskOnDrag(true);
    } else {
      setIsTaskOnDrag(false);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.combine && result.destination
      && result.source.droppableId === result.destination.droppableId) {
      const isIdTask = result.source.droppableId === 'tasks';
      const array = isIdTask ? taskList : memberList;
      const items:Array<any> = reorder(
        array,
        result.source.index,
        result.destination.index,
      );
      if (isIdTask) {
        setTaskList(items);
      } else {
        setMemberList(items);
      }
    }

    if (result.combine && result.source.droppableId !== result.combine.droppableId) {
      try {
        const taskId = result.combine.droppableId === 'tasks'
          ? result.combine.draggableId
          : result.draggableId;
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskId}`;
        const assignee = result.combine.droppableId === 'tasks'
          ? result.draggableId
          : result.combine.draggableId;
        const data = {
          status: ASSIGNED,
          assignee,
        };

        const { requestPromise } = fetch({
          url,
          method: 'patch',
          data,
        });
        await requestPromise;
        toast(SUCCESS, 'Successfully Assigned Task');
      } catch (error:any) {
        if ('response' in error) {
          toast(ERROR, error.response.data.message);
          return;
        }
        toast(ERROR, error.message);
      } finally {
        refreshData();
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className={classNames.flexContainer}>
        <div>
          {taskList.length === 0 ? (
            <NotFoundError message="No task found" />
          ) : (
            <div>
              <div className={classNames.searchBoxContainer}>
                <span
                  onClick={() => {
                    setToogleSearch(!toogleSearch);
                  }}
                  aria-hidden="true"
                  className={classNames.searchText}
                >
                  Search
                </span>
                { toogleSearch && <input placeholder="Search by task" /> }
              </div>
              <div className={classNames.heading}> </div>
              <DroppableComponent
                droppableId="tasks"
                idleMembers={[]}
                unAssignedTasks={taskList}
                isTaskOnDrag={isTaskOnDrag}
              />
            </div>
          )}
        </div>
        <div className={classNames.divider} />
        <div>
          {memberList.length === 0 ? (
            <NotFoundError message="No idle members found" />
          ) : (
            <div>
              <div className={classNames.searchBoxContainer}>
                <span
                  onClick={() => {
                    setToogleSearchName(!toogleSearchName);
                  }}
                  aria-hidden="true"
                  className={classNames.searchText}
                >
                  Search
                </span>
                {toogleSearchName && <input placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" id="idleMemberSearch" />}
              </div>
              <div className={classNames.heading}> </div>
              <div className={classNames.idleMember}>
                <DroppableComponent
                  droppableId="members"
                  idleMembers={memberList}
                  unAssignedTasks={[]}
                  isTaskOnDrag={isTaskOnDrag}
                  searchTerm={searchTerm}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default DragDropcontext;
