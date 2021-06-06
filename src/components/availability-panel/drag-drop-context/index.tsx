/* eslint-disable no-alert */
/* eslint-disable jsx-quotes */
import React, { FC, useState } from 'react';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

const onDragEnd = (result: object | any) => {
  // console.log(result);
  if (result.combine) {
    if (result.source.droppableId !== result.combine.droppableId) {
      alert(
        `${result.draggableId} has be assigned to ${result.combine.draggableId}`,
      );
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
              <Droppable droppableId='tasks' isCombineEnabled>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    <div className={classNames.searchBoxContainer}>
                      <span
                        onClick={() => {
                          setToogleSearch(!toogleSearch);
                        }}
                        aria-hidden='true'
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
              <Droppable droppableId='members' isCombineEnabled>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    <div className={classNames.searchBoxContainer}>
                      <span
                        onClick={() => {
                          setToogleSearch(!toogleSearch);
                        }}
                        aria-hidden='true'
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
