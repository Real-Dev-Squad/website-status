import { FC, useCallback, useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { droppableComponent } from '@/interfaces/availabilityPanel.type';
import DraggableComponent from '@/components/availability-panel/drag-drop-context//DraggableComponent';
import { getAllUsersCloudinaryImageURLLink } from '@/helperFunctions/getCloudinaryImageUrl';
const CLOUDINARY_IMAGE_CONFIGS = 'w_160,h_160'

const DroppableComponent: FC<droppableComponent> = ({
  droppableId,
  unAssignedTasks,
  idleMembers,
  isTaskOnDrag,
}) => {
  const [idleMembersCloudinaryImageLinks,setIdleMembersCloudinaryImageLinks] = useState<string[]>([])
  const [unAssignedTasksCloudinaryImageLinks,setUnAssignedTasksCloudinaryImageLinks] = useState<string[]>([])
  const memoizeFetchUsersCloudinaryLinks = useCallback(()=>{
    if (unAssignedTasks.length > 0) {
      const allUsersTasks = unAssignedTasks.map(({ id })=>id)
      const lstUsersCldLinks = getAllUsersCloudinaryImageURLLink(allUsersTasks,CLOUDINARY_IMAGE_CONFIGS)
      Promise.all(lstUsersCldLinks)
        .then((lstStrUsersCldLinks) => {
          setUnAssignedTasksCloudinaryImageLinks(lstStrUsersCldLinks);
        }).catch((e)=>{
          console.error(e)   
        })
    }
    if (idleMembers.length > 0) {
      const lstUsersCldLinks = getAllUsersCloudinaryImageURLLink(idleMembers,CLOUDINARY_IMAGE_CONFIGS)
      Promise.all(lstUsersCldLinks)
        .then((lstStrUsersCldLinks) => {
          setIdleMembersCloudinaryImageLinks(lstStrUsersCldLinks);
        }).catch((e)=>{
          console.error(e)   
        })
    }
  },[unAssignedTasks,idleMembers])
  
  useEffect(()=>{
    memoizeFetchUsersCloudinaryLinks()
  },[memoizeFetchUsersCloudinaryLinks])
  return(<div>
    {droppableId === 'tasks' ? (
      <Droppable droppableId="tasks" isCombineEnabled={!isTaskOnDrag}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {unAssignedTasks.map((task, index) => {
              const { id, title } = task;
              return (
                <DraggableComponent draggableId={id} index={index} title={title} key={id} imageURL={unAssignedTasksCloudinaryImageLinks[index]}/>
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
              <DraggableComponent draggableId={member} index={index} key={member} imageURL={idleMembersCloudinaryImageLinks[index]}/>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    )}
  </div>)
}

export default DroppableComponent;
