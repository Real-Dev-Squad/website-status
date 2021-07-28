import React from 'react';
import classNames from './cardShimmer.module.scss';

const CardShimmer = () => (
  <div className={`${classNames.card} ${classNames.br}`}>
    <div className={`${classNames.title} ${classNames.br} ${classNames.animate}`} />
    <div className={`${classNames.comment} ${classNames.br} ${classNames.animate}`} />
    <div className={`${classNames.comment} ${classNames.br} ${classNames.animate}`} />
    <div className={`${classNames.comment} ${classNames.br} ${classNames.animate}`} />
  </div>
);
export default CardShimmer;
