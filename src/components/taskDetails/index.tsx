import React, { ChangeEvent, FC } from 'react';
import NavBar from '@/components/navBar/index';
import TaskContainer from './TaskContainer';
import Details from './Details';
import classNames from './task-details.module.scss';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import task from '@/interfaces/task.type';
import { useState, useEffect, useContext } from 'react';
import useFetch from '@/hooks/useFetch';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import fetch from '@/helperFunctions/fetch';

type Props = {
  url: string;
  taskID: string;
};

const TaskDetails: FC<Props> = ({ url, taskID }) => {
  const isAuthorized = useContext(isUserAuthorizedContext);
  const [isEditing, setIsEditing] = useState(false);
  const [initialData, setInitialData] = useState<task>();
  const [taskDetails, setTaskDetails] = useState<task>();
  const [editedDetails, setEditedDetials] = useState({});
  const { response, error, isLoading } = useFetch(url);
  const { SUCCESS, ERROR } = ToastTypes;

  useEffect(() => {
    const fetchedData: task = { ...response.taskData };
    setTaskDetails(fetchedData);
    setInitialData(fetchedData);
  }, [isLoading, response]);

  function convertTimeStamp(timeStamp: string) {
    const dateTime = new Date(parseInt(timeStamp));
    return dateTime.toLocaleString();
  }

  function renderTextarea(name: string, value: string) {
    return (
      <textarea
        className={classNames['textarea']}
        name={name}
        value={value}
        onChange={(event) => handleChange(event)}
      />
    );
  }

  function handleChange(event: ChangeEvent) {
    const formData: any = {
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).value,
    };
    setEditedDetials({ ...editedDetails, ...formData });
    setTaskDetails({ ...taskDetails, ...formData });
  }

  function onCancel() {
    setIsEditing(false);
    setEditedDetials({});
    setTaskDetails(initialData);
  }

  async function onSave() {
    setIsEditing(false);
    try {
      const response = fetch({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskID}`,
        method: 'patch',
        data: JSON.stringify(editedDetails),
      });
      const responseData = await response.requestPromise;
      if (responseData.status === 204) {
        setInitialData(taskDetails);
        setEditedDetials({});
        toast(SUCCESS, 'Successfully saved');
      }
    } catch (err) {
      toast(ERROR, 'Could not save changes');
      setTaskDetails(initialData);
    }
  }
  return (
    <>
      <NavBar />
      {!!error ? (
        <p className={classNames['center']}>Something went wrong!</p>
      ) : isLoading ? (
        <p className={classNames['center']}>Loading...</p>
      ) : (
        taskDetails && (
          <div className={classNames['parent_container']}>
            <div className={classNames['title_container']}>
              {!isEditing ? (
                <h4 className={classNames['title']}>{taskDetails.title}</h4>
              ) : (
                renderTextarea('title', taskDetails.title)
              )}
              {isAuthorized && !isEditing && (
                <button
                  type="button"
                  className={classNames['edit_btn']}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
              {isEditing && (
                <div className={classNames['isEditTrue']}>
                  <button
                    type="button"
                    className={classNames['edit_btn']}
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={classNames['edit_btn']}
                    onClick={onSave}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className={classNames['details_container']}>
              <div className={classNames['details_left_container']}>
                <TaskContainer block_title="Description" hasImg={false}>
                  {!isEditing ? (
                    <p className={classNames['block_content']}>
                      {taskDetails.purpose === undefined ||
                      taskDetails.purpose === ''
                        ? 'No description available'
                        : taskDetails.purpose}
                    </p>
                  ) : (
                    renderTextarea('purpose', taskDetails.purpose)
                  )}
                </TaskContainer>
                <TaskContainer block_title="Details" hasImg={false}>
                  <div className={classNames['sub_details_container']}>
                    <Details detailType={'Type'} value={taskDetails.type} />
                    <Details
                      detailType={'Priority'}
                      value={taskDetails.priority}
                    />
                    <Details detailType={'Status'} value={taskDetails.status} />
                    <Details
                      detailType={'Link'}
                      value={taskDetails.featureUrl}
                    />
                  </div>
                </TaskContainer>
              </div>

              <div className={classNames['details_right_container']}>
                <TaskContainer
                  src="/participant_logo.png"
                  block_title="Participants"
                  hasImg={true}
                >
                  <Details
                    detailType={'Assignee'}
                    value={
                      taskDetails.type === 'feature'
                        ? taskDetails.assignee
                        : taskDetails.participants?.join(' , ')
                    }
                  />
                  <Details detailType={'Reporter'} value={'Ankush'} />
                </TaskContainer>
                <TaskContainer
                  src="/calendar-icon.png"
                  block_title="Dates"
                  hasImg={true}
                >
                  <Details
                    detailType={'StartedOn'}
                    value={convertTimeStamp(taskDetails.startedOn)}
                  />
                  <Details
                    detailType={'EndsOn'}
                    value={convertTimeStamp(taskDetails.endsOn)}
                  />
                </TaskContainer>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TaskDetails;
