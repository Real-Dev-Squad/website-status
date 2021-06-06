import axios, { AxiosRequestConfig } from 'axios';

type Props = {
  authToken: string;
  taskId: string;
  assignee: string;
};

const AssignTask = ({ authToken, taskId, assignee }: Props) => {
  const data = JSON.stringify({
    status: 'assgined',
    assignee,
  });
  const config: AxiosRequestConfig = {
    method: 'patch',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/tasks:${taskId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    data,
  };
  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export default AssignTask;
