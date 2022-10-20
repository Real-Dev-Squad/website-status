import React from 'react';
import NavBar from '@/components/navBar/index.tsx';
import TaskContainer from './TaskContainer';
import Details from './Details';
import classNames from './task-details.module.scss';
import { useState, useEffect } from 'react';
import useFetch from '@/hooks/useFetch';

function TaskDetails({ url, taskID }) {
  const isAuthorized = true; //use context when Akshay's PR is merged

  const [isEdit, setIsEdit] = useState(false);

  const [taskDetails, setTaskDetails] = useState({});
  const [editedDetails, setEditedDetials] = useState({});
  const { response, error, isLoading } = useFetch(url);

  useEffect(() => {
    setTaskDetails({
      ...response.taskData,
      initialData: { ...response.taskData },
    });
  }, [isLoading, response]);

  function convertTimeStamp(timeStamp) {
    const dateTime = new Date(timeStamp);
    return dateTime.toLocaleString();
  }

  function handleChange(event) {
    setEditedDetials((prv) => {
      return {
        ...prv,
        [event.target.name]: event.target.value,
      };
    });
    setTaskDetails((prv) => {
      return {
        ...prv,
        [event.target.name]: event.target.value,
      };
    });
  }

  function onCancel() {
    setIsEdit(false);
    setEditedDetials({});
    setTaskDetails((prv) => {
      return {
        ...prv.initialData,
        initialData: prv.initialData,
      };
    });
  }

  async function onSave() {
    setIsEdit(false);
    setTaskDetails((prv) => {
      return {
        ...prv,
        initialData: { ...prv },
      };
    });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskID}`,
        {
          method: 'PATCH',
          body: JSON.stringify(editedDetails),
          credentials: 'include',
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (response.ok) {
        setEditedDetials({});
      }
    } catch (err) {
      console.log(err); //error is not being caught
    }
  }

  return (
    <>
      <NavBar />
      {!!error && <p>Something went wrong!</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={classNames['parent_container']}>
          <div className={classNames['title_container']}>
            {!isEdit ? (
              <h4 className={classNames['title']}>{taskDetails?.title}</h4>
            ) : (
              <textarea
                className={classNames['textarea']}
                name="title"
                value={taskDetails?.title}
                onChange={(event) => handleChange(event)}
              />
            )}
            {isAuthorized && !isEdit && (
              <button
                type="button"
                className={classNames['edit_btn']}
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
            {isEdit && (
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
                {!isEdit ? (
                  <p className={classNames['block_content']}>
                    {taskDetails?.purpose === undefined ||
                    taskDetails?.purpose === ''
                      ? 'No description available'
                      : taskDetails?.purpose}
                  </p>
                ) : (
                  <textarea
                    className={classNames['textarea']}
                    name="purpose"
                    value={taskDetails?.purpose}
                    onChange={(event) => handleChange(event)}
                  />
                )}
              </TaskContainer>
              <TaskContainer block_title="Details" hasImg={false}>
                <div className={classNames['sub_details_container']}>
                  <Details detailType={'Type'} value={taskDetails?.type} />
                  <Details
                    detailType={'Priority'}
                    value={taskDetails?.priority}
                  />
                  <Details detailType={'Status'} value={taskDetails?.status} />
                  <Details
                    detailType={'Link'}
                    value={taskDetails?.featureUrl}
                  />
                </div>
              </TaskContainer>
              <TaskContainer block_title="Activity" hasImg={false} />
            </div>

            <div className={classNames['details_right_container']}>
              <TaskContainer
                src="/participant_logo.png"
                block_title="Participants"
                hasImg={true}
              >
                <Details
                  detailType={'Assignee'}
                  value={taskDetails?.assignee}
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
                  value={convertTimeStamp(taskDetails?.startedOn)}
                />
                <Details
                  detailType={'EndsOn'}
                  value={convertTimeStamp(taskDetails?.endsOn)}
                />
              </TaskContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskDetails;
