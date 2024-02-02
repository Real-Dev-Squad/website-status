import styles from '@/components/availability-panel/drag-drop-context/styles.module.scss';
import { FC, useContext } from 'react';
import {
    Draggable,
    DraggingStyle,
    NotDraggingStyle,
} from 'react-beautiful-dnd';
import { useGetUsersByUsernameQuery } from '@/app/services/usersApi';
import { DUMMY_PROFILE as placeholderImageURL } from '@/constants/display-sections';
import { MAX_SEARCH_RESULTS } from '@/constants/constants';
import { draggableProps } from '@/interfaces/availabilityPanel.type';
import { disableDrag } from '.';
import Image from 'next/image';

const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
    undraggable: boolean
) => {
    let color: string;
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
    const { data: userResponse } = useGetUsersByUsernameQuery({
        searchString: draggableId,
        size: MAX_SEARCH_RESULTS,
    });
    const draggableUserImageURL: string =
        userResponse?.users[0]?.picture?.url || placeholderImageURL;
    return (
        <Draggable
            key={draggableId}
            draggableId={draggableId}
            index={index}
            isDragDisabled={draggableIds.includes(draggableId)}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        draggableIds.includes(draggableId)
                    )}
                    className={styles.memberCard}
                >
                    {title.length ? (
                        <div>{title}</div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Image
                                src={draggableUserImageURL}
                                alt={draggableId}
                                width={52}
                                height={52}
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
