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
      <main className={classNames['container']}>
      <div className={classNames['head']}>
         <h1 className={classNames['head1']}>{title} </h1> 
        <div className={classNames['btn1']}>
          <button type="button1" className={classNames['btn1']}>
            Edit
          </button>
        </div>
        </div>
        <div className={classNames['mainblock']}>
          <div className={classNames['description']}>
            <h5  className={classNames['head5']}>Descritpion</h5>
            <p className={classNames['para']}>
            In React, all DOM properties and attributes 
            (including event handlers) should be camelCased.
             For example, the HTML attribute tabindex corresponds 
             to the attribute tabIndex in React. The exception
              is aria-* and data-* attributes, which should be 
              lowercased For example, you can keep aria-label as aria-label.
              </p>
          </div>
          <div className={classNames['participants']}>
            <img
              src="./public/participant logo.png"
              className={classNames['logo']}
              alt="logo"
            ></img>
            <h5  className={classNames['head5']}>Participants</h5>
            <div className={classNames['partopt']}>
              <h6  className={classNames['head6']}>Assignee:</h6>
              <h6  className={classNames['head6']}>Reporter:</h6>
            </div>
          </div>
          <div className={classNames['details']}>
            <h5  className={classNames['head5']}>Details</h5>
            <div className={classNames['detailopt']}>
              <h6  className={classNames['head6']}>Type: </h6>
              <h6  className={classNames['head6']}>Priority: </h6>
              <h6  className={classNames['head6']}>Resolution: </h6>
              <h6  className={classNames['head6']}>Status: </h6>
              <h6  className={classNames['head6']}>label: </h6>
              <h6  className={classNames['head6']}>link: </h6>
            </div>
          </div>
          <div className={classNames['dates']}>
            <div className={classNames['dateopt']}>
              <h5  className={classNames['head5']}>Dates</h5>
              <h6  className={classNames['head6']}>Created at :</h6>
              <h6  className={classNames['head6']}>Completed at :</h6>
              <h6  className={classNames['head6']}>Updated at :</h6>
            </div>
          </div>
          <div className={classNames['activity']}>
            <h5  className={classNames['head5']}>Activity</h5>
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
