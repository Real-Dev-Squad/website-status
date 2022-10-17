import React from "react";
import NavBar from "@/components/navBar/index.tsx";
import TaskContainer from "./TaskContainer";
import Details from "./Details";
import classNames from "./task-details.module.scss";

function TaskDetails({
  title,
  purpose,
  type,
  priority,
  status,
  featureUrl,
  participants,
  assignee,
  startedOn,
  endsOn,
}) {
  function convertTimeStamp(timeStamp) {
    const dateTime = new Date(timeStamp);
    return dateTime.toLocaleString();
  }

  return (
    <>
      <NavBar />
      <div className={classNames["parent_container"]}>
        <div className={classNames["title_container"]}>
          <h4 className={classNames["title"]}>{title}</h4>
          <button type="button" className={classNames["edit_btn"]}>
            Edit
          </button>
        </div>

        <div className={classNames["details_container"]}>
          <div className={classNames["details_left_container"]}>
            <TaskContainer block_title="Description" hasImg={false}>
              <p className={classNames["block_content"]}>
                {purpose === undefined ? "No description available" : purpose}
              </p>
            </TaskContainer>
            <TaskContainer block_title="Details" hasImg={false}>
              <div className={classNames["sub_details_container"]}>
                <Details detailType={"Type"} value={type} />
                <Details detailType={"Priority"} value={priority} />
                <Details detailType={"Status"} value={status} />
                <Details detailType={"Link"} value={featureUrl} />
              </div>
            </TaskContainer>
            <TaskContainer block_title="Activity" hasImg={false} />
          </div>

          <div className={classNames["details_right_container"]}>
            <TaskContainer
              src="/participant_logo.png"
              block_title="Participants"
              hasImg={true}
            >
              <Details detailType={"Assignee"} value={assignee} />
              <Details detailType={"Reporter"} value={"Ankush"} />
            </TaskContainer>
            <TaskContainer
              src="/calendar-icon.png"
              block_title="Dates"
              hasImg={true}
            >
              <Details
                detailType={"StartedOn"}
                value={convertTimeStamp(startedOn)}
              />
              <Details detailType={"EndsOn"} value={convertTimeStamp(endsOn)} />
            </TaskContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
