import { FC } from 'react';
import Image from 'next/image';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { droppableComponent } from '@/interfaces/availabilityPanel.type';

const imageGenerator = (name: string) => `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${name}/img.png`;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  const style = {
    background: isDragging ? '#d1d1d1' : 'white',
    ...draggableStyle,
  };
  return style;
};

const DroppableComponent: FC<droppableComponent> = ({
  droppableId,
  unAssignedTasks,
  idleMembers,
  isTaskOnDrag,
}) => (
  <div>
    {droppableId === 'tasks' ? (
      <Droppable droppableId="tasks" isCombineEnabled={!isTaskOnDrag}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {unAssignedTasks.map((task, index) => {
              const { id, title } = task;
              return (
                <Draggable key={id} draggableId={id} index={index}>
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
                      <div>{title}</div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ) : (
      <Droppable droppableId="members" isCombineEnabled={isTaskOnDrag}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {idleMembers.map((member, index) => (
              <Draggable key={member} draggableId={member} index={index}>
                {(Provided, snapshot) => (
                  <div
                    ref={Provided.innerRef}
                    {...Provided.draggableProps}
                    {...Provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      Provided.draggableProps.style,
                    )}
                    className={classNames.memberCard}
                  >
                    <Image
                      src={imageGenerator(member)}
                      alt={member}
                      width={52}
                      height={52}
                      onError={(e) => { (e.target as HTMLImageElement).src = '/dummyProfile.png'; }}
                    />
                    <span>{member}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )}
  </div>
);

export default DroppableComponent;
