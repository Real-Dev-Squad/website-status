import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';
import { FC, useContext } from 'react';
import { draggableProps } from '@/interfaces/availabilityPanel.type';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { disableDrag } from '.';
import Image from 'next/image';

const imageGenerator = (name: string) => `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${name}/img.png`;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
  undraggable: boolean,
  darkMode: boolean,
) => {
  let color: string;
  if (undraggable) {
    color = darkMode ? 'black' : 'darkgrey';
  } else if (isDragging) {
    color = darkMode ? 'rgb(49 47 59 / 36%)' : '#d1d1d1';
  } else {
    color = darkMode ? '#312F3B' : 'white';
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
  darkMode
}) => {
  const draggableIds = useContext(disableDrag);
  return (
    <Draggable
      key={draggableId}
      draggableId={draggableId}
      index={index}
      isDragDisabled={draggableIds.includes(draggableId)}
    >
      {(provided, snapshot) => (
        <div className={darkMode ? classNames.darkTheme : classNames.lightTheme} >
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
              draggableIds.includes(draggableId),
              darkMode
            )}
            className={classNames.memberCard}
          >
            {title.length
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
        </div>
      )}
    </Draggable>
  );
};

export default DraggableComponent;
