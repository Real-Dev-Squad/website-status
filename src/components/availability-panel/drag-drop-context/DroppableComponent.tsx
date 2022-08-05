import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { droppableComponent } from '@/interfaces/availabilityPanel.type';

import idleMembers from '@/pages/idle-members';
type NotFoundErrorProps = {
  message: string,
};

const NotFoundError:FC<NotFoundErrorProps> = ({ message = 'Not found' }) => (
  <div className={classNames.emptyArray}>
    <img src="ghost.png" alt="ghost" />
    <span className={classNames.emptyText}>
      {message}
    </span>
  </div>
);

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
  searchTermMember,
  searchTermTask,
}) => (
  <div>
    {droppableId === 'tasks' ? (
      <Droppable droppableId="tasks" isCombineEnabled={!isTaskOnDrag}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {(unAssignedTasks.filter((taskItem) => {
              if (searchTermTask === '') {
                return true;
              } 
              if (taskItem.title.toLowerCase().includes(searchTermTask.trim().toLowerCase())) {
                return true;
              }
              return false;
            })).length === 0 ? (<NotFoundError message="No tasks found" />):
            (unAssignedTasks.filter((taskItem) => {
              if (searchTermTask === '') {
                return true;
              } 
              if (taskItem.title.toLowerCase().includes(searchTermTask.trim().toLowerCase())) {
                return true;
              }
              return false;
            }).map((task, index) => {
              const { id, title } = task;
              return (
                <DraggableComponent draggableId={id} index={index} title={title} key={id} />
              );
            }))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    ) : (
      <Droppable droppableId="members" isCombineEnabled={isTaskOnDrag}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {(idleMembers.filter((memberItem) => {
              if (searchTermMember === '') {
                return true;
              } if (memberItem.toLowerCase().includes(searchTermMember.trim().toLowerCase())) {
                return true;
              }
              return false;})).length === 0 ? (<NotFoundError message="No idle members found" />)
            : (idleMembers.filter((memberItem) => {
              if (searchTermMember === '') {
                return true;
              } if (memberItem.toLowerCase().includes(searchTermMember.trim().toLowerCase())) {
                return true;
              }
              return false;
            }).map((member, index) => (
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
                    <img
                      src={imageGenerator(member)}
                      alt={member}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'dummyProfile.png'; }}
                    />
                    <span>{member}</span>
                  </div>
                )}
              </Draggable>
            )))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )}
  </div>
);

export default DroppableComponent;
