import { FC, useState } from 'react';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { dragDropProps } from '@/Interfaces/availabilityPanel.types';
import fetch from '../../../helperFunctions/fetch';
import DroppableComponent from './DroppableComponent';

const DragDropcontext: FC<dragDropProps> = ({
  unAssignedTasks,
  idleMembers,
}) => {
  const [toogleSearch, setToogleSearch] = useState<boolean>(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
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
        const data = JSON.stringify({
          status: 'active',
          assignee,
        });
        const headers = {
          'Content-Type': 'application/json',
        };
        const response = await fetch({
          url,
          method,
          data,
          headers,
        });
        const message = (await response.status) === 204
          ? 'Sucessfully Assigned Task'
          : 'Something went wrong';
        alert(message);
        setShouldRefresh(true);
      } catch (err) {
        alert(`${err}`);
        setShouldRefresh(true);
      }
    }
  };

  if (shouldRefresh) {
    window.location.reload();
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isProcessing && (
        <div className={classNames.statusMessage}>Please wait...</div>
      )}
      <div className={classNames.flexContainer}>
        <div>
          {unAssignedTasks.length === 0 ? (
            <div className={classNames.emptyArray}>No Tasks found</div>
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
            <div className={classNames.emptyArray}>No idle users Found</div>
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
    </DragDropContext>
  );
};

export default DragDropcontext;
