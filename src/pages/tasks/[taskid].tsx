/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import router, { useRouter } from 'next/router';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import Accordion from '@/components/Accordion';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
// import Image from 'next/image';
// import classNames from '@/components/tasks/detailPage/card.module.scss';
import task from '@/interfaces/task.type';

const Detail : FC = (props:any) => {
  const router = useRouter();
  const { taskid } = router.query;
  return (
    <Layout>
      <Head title="Tasks" />

      <div className={classNames.container}>
        <p>
          hello
          {' '}
          {taskid}
        </p>
      </div>
    </Layout>
  );
};
export default Detail;
