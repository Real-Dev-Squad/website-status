import React from 'react';
import NavBar from '@/components/navBar/index.tsx';
import classNames from '@/components/tasks/card/task-details.module.scss';

function TaskDetails({
  title,
  type,
  status,
  links,
  participants,
  assignee,
  startedOn,
  endsOn,
}) {
  return (
    <>
      <NavBar />
      <main className={classNames.container}>
        <h1>{title}</h1>
        <div className={classNames.btn1}>
          <button type="button1" className={classNames.btn1}>
            Edit
          </button>
        </div>

        <div className={classNames.mainblock}>
          <div className={classNames.Description}>
            <h5>Descritpion</h5>
            <p>
              In React, all DOM properties and attributes (including event
              handlers) should be camelCased. For example, the HTML attribute
              tabindex corresponds to the attribute tabIndex in React. The
              exception is aria-* and data-* attributes, which should be
              lowercased. For example, you can keep aria-label as aria-label.
            </p>
          </div>
          <div className={classNames.Participants}>
            <img
              src="./public/participant logo.png"
              className={classNames.logo}
              alt="logo"
            ></img>
            <h5>Participants</h5>
            <div className={classNames['part-opt']}>
              <h6>Assignee:</h6>
              <h6>Reporter:</h6>
            </div>
          </div>
          <div className={classNames.Details}>
            <h5>Details</h5>
            <div className={classNames['detail-opt']}>
              <h6>Type: </h6>
              <h6>Priority: </h6>
              <h6>Resolution: </h6>
              <h6>Status: </h6>
              <h6>label: </h6>
              <h6>link: </h6>
            </div>
          </div>
          <div className={classNames.Dates}>
            <div className={classNames['date-opt']}>
              <h5>Dates</h5>
              <h6>Created at :</h6>
              <h6>Completed at :</h6>
              <h6>Updated at :</h6>
            </div>
          </div>
          <div className={classNames.Activity}>
            <h5>Activity</h5>
            <div className={classNames.btn}>
              <button type="button2" className="btn btn-light mr-1">
                All
              </button>
              <button type="button3" className="btn btn-light mr-1">
                History
              </button>
              <button type="button4" className="btn btn-light mr-1">
                Comments
              </button>
            </div>
            <div className="row align-items-start">
              <div className="col">One of three columns</div>
              <div className="col">One of three columns</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default TaskDetails;
