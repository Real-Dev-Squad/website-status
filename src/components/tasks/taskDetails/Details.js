import React from "react";
import classNames from "./task-details.module.scss";

function Details({ detailType, value }) {
  return (
    <div>
      <span className={classNames["block_content_detail_type"]}>
        {detailType}:
      </span>
      <span className={classNames["block_content_value"]}>
        {value ? value : "N/A"}
      </span>
    </div>
  );
}

export default Details;
