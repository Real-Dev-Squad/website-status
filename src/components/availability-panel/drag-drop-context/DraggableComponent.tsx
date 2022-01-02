import { Draggable } from 'react-beautiful-dnd';
import { FC } from 'react';
import { draggableProps } from '@/interfaces/availabilityPanel.type';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';

const imageGenerator = (name: string) => `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${name}/img.png`;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  const style = {
    background: isDragging ? '#d1d1d1' : 'white',
    ...draggableStyle,
  };
  return style;
};

const DraggableComponent: FC<draggableProps> = ({
  draggableId,
  index,
  title = '',
}) => (
  <Draggable
    key={draggableId}
    draggableId={draggableId}
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
export default DraggableComponent;
