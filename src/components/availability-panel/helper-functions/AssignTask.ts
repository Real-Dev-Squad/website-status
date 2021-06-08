import axios, { AxiosRequestConfig } from 'axios';

type Props = {
  authToken: string;
  taskId: string;
  assignee: string;
};

const AssignTask = async ({ authToken, taskId, assignee }: Props) => {
  try {
    const data = JSON.stringify({
      status: 'assgined',
      assignee,
    });
    const config: AxiosRequestConfig = {
      method: 'patch',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskId}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      data,
    };
    const response = await axios(config);
    return response;
  } catch (err) {
    return err;
  }
};

export default AssignTask;
