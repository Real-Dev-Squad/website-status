import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
// import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { droppableComponent } from '@/interfaces/availabilityPanel.type';
import DraggableComponent from '@/components/availability-panel/drag-drop-context//DraggableComponent';

// const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
//   const style = {
//     background: isDragging ? '#d1d1d1' : 'white',
//     ...draggableStyle,
//   };
//   return style;
// };
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
              // <Draggable key={id} draggableId={id} index={index}>
              //   {(Provided, snapshot) => (
              //     <div
              //       ref={Provided.innerRef}
                //       {...Provided.draggableProps}
              //       {...Provided.dragHandleProps}
              //       style={getItemStyle(
                //         snapshot.isDragging,
              //         Provided.draggableProps.style,
              //       )}
              //       className={classNames.taskItem}
              //     >
              //       <div>{title}</div>
              //     </div>
              //   )}
              // </Draggable>
                <DraggableComponent draggableId={id} index={index} title={title} />
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
              <DraggableComponent draggableId={member} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )}
  </div>
);

export default DroppableComponent;
