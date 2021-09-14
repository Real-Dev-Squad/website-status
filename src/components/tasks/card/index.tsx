import { FC, useState, useEffect } from "react";
import classNames from "@/components/tasks/card/card.module.scss";
import task from "@/interfaces/task.type";
import Image from "next/image";
import {
  ACTIVE,
  ASSIGNED,
  COMPLETED,
} from "@/components/constants/task-status";

const moment = require("moment");

type Props = {
  content: task;
};

const Card: FC<Props> = ({ content, shouldEdit, onContentChange }) => {
  // const {
  //   id, title, endsOn, startedOn, status, assignee,
  // } = content;
  const cardDetails = (content);

  const [assigneeProfilePic, setAssigneeProfilePic] = useState(
    `${process.env.NEXT_PUBLIC_GITHUB_IMAGE_URL}/${cardDetails.assignee}/img.png`
  );
  const contributorImageOnError = () =>
    setAssigneeProfilePic("dummyProfile.png");

  const localStartedOn = new Date(parseInt(cardDetails.startedOn, 10) * 1000);
  const fromNowStartedOn = moment(localStartedOn).fromNow();

  const localEndsOn = new Date(parseInt(cardDetails.endsOn, 10) * 1000);
  const fromNowEndsOn = moment(localEndsOn).fromNow();

  const statusFontColor =
    status === ACTIVE || ASSIGNED || COMPLETED ? "#00a337" : "#f83535";

  const iconHeight = "25px";
  const iconWidth = "25px";

  const cardClassNames = [classNames.card];

  function isTaskOverdue() {
    const currentDate = new Date();
    const timeLeft = localEndsOn.valueOf() - currentDate.valueOf();
    return status !== COMPLETED && timeLeft <= 0;
  }

  function stripHtml(html) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  function handleTitleChange(event, changedDetails) {
    if (event.key === "Enter") {
      const toChange = cardDetails;
      toChange.[changedDetails]= stripHtml(event.target.innerHTML);
      onContentChange(toChange);
    }
  }

  if (isTaskOverdue()) {
    cardClassNames.push(classNames.overdueTask);
  }
  return (
    <div
      className={`
    ${classNames.card}
    ${isTaskOverdue() && classNames.overdueTask}
`}
    >
      <div className={classNames.cardItems}>
        <span
          className={classNames.cardTitle}
          contentEditable={shouldEdit}
          onKeyPress={(e) => handleTitleChange(e, 'title')}
        >
          {cardDetails.title}
        </span>
        <span>
          <span className={classNames.cardSpecialFont}>Status:</span>
          <span
            className={classNames.cardStatusFont}
            contentEditable={shouldEdit}
            onKeyPress={(e) => handleTitleChange(e, 'status')}
            style={{ color: statusFontColor }}
          >
            {cardDetails.status}
          </span>
        </span>
      </div>
      <div className={classNames.cardItems}>
        <span>
          <Image
            src="/calendar-icon.png"
            alt="calendar icon"
            width={iconWidth}
            height={iconHeight}
          />
          <span className={classNames.cardSpecialFont}>Due Date</span>
          <span className={classNames.cardStrongFont}
          contentEditable={shouldEdit}
          onKeyPress={(e) => handleTitleChange(e, 'fromNowEndsOn')}>{fromNowEndsOn}</span>
        </span>
      </div>
      <div className={classNames.cardItems}>
        <span className={classNames.cardSpecialFont}
        contentEditable={shouldEdit}
        onKeyPress={(e) => handleTitleChange(e, 'fromNowStartedOn')}>
          Started {fromNowStartedOn}
        </span>
        <span>
          <span className={classNames.cardSpecialFont}>Assignee:</span>
          <span className={classNames.cardStrongFont}
          contentEditable={shouldEdit}
          onKeyPress={(e) => handleTitleChange(e, 'assignee')}>
            {cardDetails.assignee}
          </span>
          <span>
            <img
              className={classNames.contributorImage}
              src={assigneeProfilePic}
              alt=""
              onError={contributorImageOnError}
            />
          </span>
        </span>
      </div>
    </div>
  );
};
export default Card;
