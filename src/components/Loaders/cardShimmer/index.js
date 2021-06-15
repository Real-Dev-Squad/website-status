import React from "react";
import classNames from "./cardShimmer.module.scss";

const CardShimmer = () => (
  <div className={`${classNames.card} ${classNames.br}`}>
    <div className={classNames.wrapper}>
      <div
        className={`${classNames.title} ${classNames.br} ${classNames.animate}`}
      />
      <div
        className={`${classNames.create} ${classNames.br} ${classNames.animate}`}
      />
      <div
        className={`${classNames.comment} ${classNames.br} ${classNames.animate}`}
      />
      <div
        className={`${classNames.comment} ${classNames.br} ${classNames.animate}`}
      />
      {/* <div className={`${classNames.button} ${classNames.animate}`} /> */}
    </div>
  </div>
);
export default CardShimmer;
