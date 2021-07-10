import { FC, useState } from 'react';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { dragDropProps } from '@/interfaces/availabilityPanel.type';
import { toast } from 'react-toastify';
import fetch from '../../../helperFunctions/fetch';
import DroppableComponent from './DroppableComponent';

const DragDropcontext: FC<dragDropProps> = ({
  unAssignedTasks,
  idleMembers,
  refreshData,
}) => {
  const [toogleSearch, setToogleSearch] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onDragEnd = async (result: DropResult) => {
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
      } catch (err) {
        toast.error(`${err}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } finally {
        refreshData();
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isProcessing && (
        <div className={classNames.statusMessage}>Please wait...</div>
      )}
      {!isProcessing && (
      <div className={classNames.flexContainer}>
        <div>
          {unAssignedTasks.length === 0 ? (
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
                unAssignedTasks={unAssignedTasks}
              />
            </div>
          )}
        </div>
        <div className={classNames.divider} />
        <div>
          {idleMembers.length === 0 ? (
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
                  idleMembers={idleMembers}
                  unAssignedTasks={[]}
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
