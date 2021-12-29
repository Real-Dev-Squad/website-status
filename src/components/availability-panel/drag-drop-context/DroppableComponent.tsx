import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { droppableComponent } from '@/interfaces/availabilityPanel.type';
import DraggableComponent from '@/components/availability-panel/drag-drop-context//DraggableComponent';

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
                <DraggableComponent draggableId={id} index={index} title={title} key={id} />
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
              <DraggableComponent draggableId={member} index={index} key={member} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )}
  </div>
);

export default DroppableComponent;
