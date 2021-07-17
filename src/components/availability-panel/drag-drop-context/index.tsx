import { FC, useState, useEffect } from 'react';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { dragDropProps } from '@/interfaces/availabilityPanel.type';
import { toast } from 'react-toastify';
import task from '@/interfaces/task.type';
import fetch from '../../../helperFunctions/fetch';
import DroppableComponent from './DroppableComponent';

const DragDropcontext: FC<dragDropProps> = ({
  unAssignedTasks,
  idleMembers,
  refreshData,
}) => {
  const [toogleSearch, setToogleSearch] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Array<task>>(unAssignedTasks);
  const [memberList, setMemberList] = useState<Array<string>>(idleMembers);
  const [isTaskOnDrag, setIsTaskOnDrag] = useState<boolean>(false);

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
      setIsProcessing(true);
      try {
        const taskId = result.combine.droppableId === 'tasks'
          ? result.combine.draggableId
          : result.draggableId;
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskId}`;
        const assignee = result.combine.droppableId === 'tasks'
          ? result.draggableId
          : result.combine.draggableId;
        const method = 'patch';
        const data = {
          status: 'active',
          assignee,
        };
        const headers = {
          'Content-Type': 'application/json',
        };
        await fetch({
          url,
          method,
          data,
          headers,
        });
        const message = 'Sucessfully Assigned Task';
        toast.success(`${message}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } catch (error:any) {
        const { message } = error.response.data;
        toast.error(`${message || error}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } finally {
        refreshData();
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {isProcessing && (
        <div className={classNames.statusMessage}>Please wait...</div>
      )}
      {!isProcessing && (
      <div className={classNames.flexContainer}>
        <div>
          {taskList.length === 0 ? (
            <div className={classNames.emptyArray}>
              <img src="ghost.png" alt="ghost" />
              <span className={classNames.emptyText}>
                No task found
              </span>
            </div>
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
                {toogleSearch && <input />}
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
            <div className={classNames.emptyArray}>
              <img src="ghost.png" alt="ghost" />
              <span className={classNames.emptyText}>
                No idle members found
              </span>
            </div>
          ) : (
            <div>
              <div className={classNames.searchBoxContainer}>
                <span />
                {toogleSearch && <input />}
              </div>
              <div className={classNames.heading}> </div>
              <div className={classNames.idleMember}>
                <DroppableComponent
                  droppableId="members"
                  idleMembers={memberList}
                  unAssignedTasks={[]}
                  isTaskOnDrag={isTaskOnDrag}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </DragDropContext>
  );
};

export default DragDropcontext;
