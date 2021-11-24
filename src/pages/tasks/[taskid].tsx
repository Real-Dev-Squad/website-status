import React, { FC } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Head from '@/components/head';
import classNames from '@/styles/taskdetail.module.scss';
import Layout from '@/components/Layout';

const Detail : FC = () => {
  const router = useRouter();
  const {
    taskid,
    title,
    status,
    startedOn,
    endsOn,
    assignee,
  } = router.query;
  const localStartedOn = new Date(parseInt(String(startedOn), 10) * 1000);
  const fromNowStartedOn = moment(localStartedOn).fromNow();

  const localEndsOn = new Date(parseInt(String(endsOn), 10) * 1000);
  const fromNowEndsOn = moment(localEndsOn).fromNow();
  return (

    <Layout>
      <Head title="Task Detail" />
      <div className={classNames.Container}>
        <div>
          <div className={classNames.titleLine}>
            <span
              className={classNames.backhover}
              role="button"
              onClick={() => router.back()}
              aria-hidden="true"
              tabIndex={0}
            >
              Back

            </span>
            <span
              className={classNames.Title}
            >
              {title}
            </span>
            <span>
              TaskID:
              {' '}
              {taskid}
            </span>
          </div>
          <div className={classNames.Status}>
            <div className={classNames.SpecialFont}>Status:</div>
            <div
              className={classNames.StatusFont}
            >
              {status}
            </div>
          </div>
        </div>
        <div className={classNames.Items}>
          <span>
            <span className={classNames.cardSpecialFont}>Due Date</span>
            <span
              className={classNames.cardStrongFont}
            >
              {fromNowEndsOn}
            </span>
          </span>
        </div>
        <div className={classNames.Items}>
          <span
            className={classNames.cardSpecialFont}
          >
            Started
            {' '}
            {fromNowStartedOn}
          </span>
          <span>
            <span className={classNames.cardSpecialFont}>Assignee:</span>
            <span
              className={classNames.cardStrongFont}
            >
              {assignee}
            </span>

          </span>
        </div>
      </div>
    </Layout>
  );
};
export default Detail;
