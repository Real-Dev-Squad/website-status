import { Draggable } from 'react-beautiful-dnd';
import { FC, useContext } from 'react';
import { draggableProps } from '@/interfaces/availabilityPanel.type';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { disableDrag } from './index';

const imageGenerator = (name: string) => `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${name}/img.png`;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any,
  draggableIds: string[],
  draggableId: string,
) => {
  const style = {
    ...draggableStyle,
  };
  if (draggableIds.includes(draggableId)) {
    style.background = '#aeaeae';
  } else if (isDragging) {
    style.background = '#d1d1d1';
  } else {
    style.background = 'white';
  }
  return style;
};

const DraggableComponent: FC<draggableProps> = ({
  draggableId,
  index,
  title = '',
}) => {
  const draggableIds = useContext(disableDrag);
  return (
    <Draggable
      key={draggableId}
      draggableId={draggableId}
      index={index}
      // isDragDisabled={draggableIds.includes(draggableId)})}
    >
      {(Provided, snapshot) => (
        <div
          ref={Provided.innerRef}
          {...Provided.draggableProps}
          {...Provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            Provided.draggableProps.style,
            draggableIds,
            draggableId,
          )}
          className={classNames.memberCard}
        >
          { title.length
            ? <div>{title}</div>
            : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={imageGenerator(draggableId)}
                  alt={draggableId}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'dummyProfile.png'; }}
                />
                <span>{draggableId}</span>
              </div>
            )}
        </div>
      )}
    </Draggable>
  );
};
export default DraggableComponent;
