import { Draggable } from 'react-beautiful-dnd';
import { FC, useContext } from 'react';
import { draggableProps } from '@/interfaces/availabilityPanel.type';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { disableDrag } from '.';
import Image from 'next/image';

const imageGenerator = (name: string) => `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${name}/img.png`;

const getItemStyle = (isDragging: boolean, draggableStyle: any, undraggable: boolean) => {
  let color:string;
  if (undraggable) {
    color = 'darkgrey';
  } else if (isDragging) {
    color = '#d1d1d1';
  } else {
    color = 'white';
  }
  const style = {
    background: color,
    ...draggableStyle,
  };
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
      isDragDisabled={draggableIds.includes(draggableId)}
    >
      {(Provided, snapshot) => (
        <div
          ref={Provided.innerRef}
          {...Provided.draggableProps}
          {...Provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            Provided.draggableProps.style,
            draggableIds.includes(draggableId),
          )}
          className={classNames.memberCard}
        >
          { title.length
            ? <div>{title}</div>
            : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={imageGenerator(draggableId)}
                  alt={draggableId}
                  width={52}
                  height={52}
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
