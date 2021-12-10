import { Draggable } from 'react-beautiful-dnd';
import { FC, useContext } from 'react';
import { draggableProps } from '@/interfaces/availabilityPanel.type';
import classNames from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { disableDrag } from './index';

const imageGenerator = (name: string) => `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${name}/img.png`;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any,
  draggableId1: string,
  draggableId2: string,
  draggableId: string,
) => {
  const style = {
    // eslint-disable-next-line no-nested-ternary
    background: draggableId1 === draggableId || draggableId2 === draggableId ? '#aeaeae' : isDragging ? '#d1d1d1' : 'white',
    // background: isDragging ? '#d1d1d1' : 'white',
    ...draggableStyle,
  };
  return style;
};

const DraggableComponent: FC<draggableProps> = ({
  draggableId,
  index,
  title = '',
}) => {
  // const [isDragDisabled] = useState(false);
  const { draggableId1, draggableId2 } = useContext(disableDrag);
  console.log(draggableId1, `${draggableId2} from draggablecomponent`);
  return (
    <Draggable
      key={draggableId}
      draggableId={draggableId}
      index={index}
      isDragDisabled={(draggableId2 === draggableId || draggableId1 === draggableId)}
    >
      {(Provided, snapshot) => (
        <div
          ref={Provided.innerRef}
          {...Provided.draggableProps}
          {...Provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            Provided.draggableProps.style,
            draggableId1,
            draggableId2,
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
