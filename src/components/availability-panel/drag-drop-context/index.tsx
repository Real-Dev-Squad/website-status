/* eslint-disable no-alert */
import React, { FC, useState } from 'react';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import fetch from '../../../helperFunctions/fetch';

type Props = {
  idleMembers: Array<string>;
  unAssignedTasks: Array<object | any>;
};

const imageGenerator = (name: string) => `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${name}/img.png`;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  const style = {
    background: isDragging ? '#6e6e8f' : 'white',
    ...draggableStyle,
  };
  return style;
};

const onDragEnd = async (result: object | any) => {
  if (result.combine) {
    if (result.source.droppableId !== result.combine.droppableId) {
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
          status: 'assigned',
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
      } catch (err) {
        alert(`${err}`);
      }
    }
  }
};

const DragDropcontext: FC<Props> = ({ unAssignedTasks, idleMembers }) => {
  const [toogleSearch, setToogleSearch] = useState<boolean>(false);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classNames.flexContainer}>
        <div>
          {unAssignedTasks.length === 0 ? (
            <div>No Tasks found</div>
          ) : (
            <div>
              <Droppable droppableId="tasks" isCombineEnabled>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    <div className={classNames.searchBoxContainer}>
                      <span
                        onClick={() => {
                          setToogleSearch(!toogleSearch);
                        }}
                        aria-hidden="true"
                      >
                        Search
                      </span>
                      {toogleSearch && <input />}
                    </div>
                    <div className={classNames.heading}> </div>
                    {unAssignedTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(Provided, snapshot) => (
                          <div
                            ref={Provided.innerRef}
                            {...Provided.draggableProps}
                            {...Provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              Provided.draggableProps.style,
                            )}
                            className={classNames.taskItem}
                          >
                            <div>{task.title}</div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </div>
        <div className={classNames.divider} />
        <div>
          {idleMembers.length === 0 ? (
            <div>No idle users Found</div>
          ) : (
            <div>
              <Droppable droppableId="members" isCombineEnabled>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    <div className={classNames.searchBoxContainer}>
                      <span
                        onClick={() => {
                          setToogleSearch(!toogleSearch);
                        }}
                        aria-hidden="true"
                      >
                        Search
                      </span>
                      {toogleSearch && <input />}
                    </div>
                    <div className={classNames.heading}> </div>
                    {idleMembers.map((member, index) => (
                      <Draggable
                        key={member}
                        draggableId={member}
                        index={index}
                      >
                        {(Provided, snapshot) => (
                          <div
                            ref={Provided.innerRef}
                            {...Provided.draggableProps}
                            {...Provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              Provided.draggableProps.style,
                            )}
                            className={classNames.taskItem}
                          >
                            <div className={classNames.memberCard}>
                              <img src={imageGenerator(member)} alt={member} />
                              <span>{member}</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default DragDropcontext;
