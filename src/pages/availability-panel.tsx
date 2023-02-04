import { FC, useState, useEffect } from "react";
import Head from "@/components/head";
import Layout from "@/components/Layout";
import task from "@/interfaces/task.type";
import classNames from "@/styles/availabilityPanel.module.scss";
import fetch from "@/helperFunctions/fetch";
import DragDropContextWrapper from "@/components/availability-panel/drag-drop-context/index";
import updateTasksStatus from "@/helperFunctions/updateTasksStatus";
import { AVAILABLE } from "@/components/constants/task-status";
import { FEATURE } from "@/components/constants/task-type";
import { currentStatusParent } from "@/interfaces/availabilityPanel.type";

const AvailabilityPanel: FC = () => {
  const [idleMembersList, setIdleMembersList] = useState<string[]>([]);
  const [unAssignedTasks, setUnAssignedTasks] = useState<task[]>([]);
  const [currentStatus, setCurrentStatus] =
    useState<currentStatusParent>("isLoading");
  const [refreshData, setRefreshData] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;
        const { requestPromise } = fetch({ url });
        const fetchPromise = await requestPromise;
        const { tasks } = fetchPromise.data;
        const unassigned = updateTasksStatus(tasks).filter(
          (item: task) => item.status === AVAILABLE && item.type === FEATURE
        );
        setUnAssignedTasks(unassigned);
      } catch (Error) {
        setCurrentStatus("error");
      }
    };
    const fetchIdleUsers = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/members/idle`;
        const { requestPromise } = fetch({ url });
        const fetchPromise = await requestPromise;
        const { idleMemberUserNames } = fetchPromise.data;
        const filterMembers = idleMemberUserNames.filter(
          (username: string) => username
        );
        const sortedIdleMembers = filterMembers.sort();
        setIdleMembersList(sortedIdleMembers);
        setCurrentStatus("success");
      } catch (Error) {
        setCurrentStatus("error");
      }
    };
    fetchTasks();
    fetchIdleUsers();
  }, [refreshData]);

  let isErrorOrIsLoading;
  if (currentStatus === "error") {
    isErrorOrIsLoading = (
      <span className={classNames.statusMessage}>
        Something went wrong, please contact admin!
      </span>
    );
  } else if (currentStatus === "isLoading") {
    isErrorOrIsLoading = (
      <span className={classNames.statusMessage}>Loading...</span>
    );
  }

  const getData = () => {
    setCurrentStatus("isLoading");
    setRefreshData(!refreshData);
  };

  return (
    <Layout>
      <Head title="Availability Panel" />
      <div>
        <div className={classNames.heading}>Availability Panel</div>
        {isErrorOrIsLoading}
        {!isErrorOrIsLoading && (
          <DragDropContextWrapper
            idleMembers={idleMembersList}
            unAssignedTasks={unAssignedTasks}
            refreshData={getData}
          />
        )}
      </div>
    </Layout>
  );
};

export default AvailabilityPanel;
