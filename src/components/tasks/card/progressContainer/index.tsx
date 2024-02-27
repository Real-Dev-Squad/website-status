import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import {
    useUpdateSelfTaskMutation,
    useUpdateTaskMutation,
} from '@/app/services/tasksApi';
import useUserData from '@/hooks/useUserData';
import { useGetUserQuery } from '@/app/services/userApi';
import ProgressText from './ProgressText';
import Progressbar from './ProgressBar';
import { ERROR_MESSAGE, PROGRESS_SUCCESSFUL } from '@/constants/constants';
import styles from '@/components/tasks/card/card.module.scss';
import { ProgressContainerProps } from '@/interfaces/task.type';

const ProgressContainer: FC<ProgressContainerProps> = ({ content }) => {
    const [isProgressMade, setIsProgressMade] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState<number>(
        content.percentCompleted
    );

    const { isUserAuthorized } = useUserData();
    const { data: userData } = useGetUserQuery();
    const [updateTask, { isLoading: isLoadingUpdateTaskDetails }] =
        useUpdateTaskMutation();
    const [updateSelfTask, { isLoading: isLoadingSelfTaskUpdate }] =
        useUpdateSelfTaskMutation();

    const checkingLoading =
        isLoadingUpdateTaskDetails || isLoadingSelfTaskUpdate;

    const { SUCCESS, ERROR } = ToastTypes;

    const handleSliderChangeComplete = (
        id: string,
        percentCompleted: number
    ) => {
        const taskData = {
            percentCompleted: percentCompleted,
        };
        if (isUserAuthorized) {
            updateTask({
                task: taskData,
                id: id,
            })
                .unwrap()
                .then(() => toast(SUCCESS, PROGRESS_SUCCESSFUL))
                .catch(() => toast(ERROR, ERROR_MESSAGE));
        } else {
            updateSelfTask({ task: taskData, id: id })
                .unwrap()
                .then(() => toast(SUCCESS, PROGRESS_SUCCESSFUL))
                .catch(() => toast(ERROR, ERROR_MESSAGE));
        }
    };

    const onProgressChange = () => {
        handleSliderChangeComplete(content.id, progressValue);
        setIsProgressMade(false);
    };

    const debounceSlider = (debounceTimeOut: number) => {
        if (debounceTimeOut) {
            clearTimeout(debounceTimeOut);
        }
        setTimeout(() => {
            onProgressChange();
        }, 1000);
    };

    const handleProgressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProgressValue(Number(event.target.value));
    };

    const handleProgressUpdate = () => {
        if (
            content.assignee === userData?.username ||
            !!userData?.roles.super_user
        ) {
            setIsProgressMade((prev) => !prev);
        } else {
            toast(ERROR, 'You cannot update progress');
        }
    };

    const showUpdateButton = () => {
        if (
            content.assignee === userData?.username ||
            !!userData?.roles.super_user
        ) {
            return (
                <ProgressText
                    handleProgressUpdate={handleProgressUpdate}
                    isLoading={checkingLoading}
                />
            );
        }
    };

    return (
        <>
            <div className={styles.progressContainerUpdated}>
                <Progressbar
                    progress={isProgressMade}
                    progressValue={progressValue}
                    percentCompleted={content.percentCompleted}
                    handleProgressChange={handleProgressChange}
                    debounceSlider={debounceSlider}
                    startedOn={content.startedOn}
                    endsOn={String(content.endsOn)}
                    isLoading={checkingLoading}
                />
                {showUpdateButton()}
            </div>
        </>
    );
};

export default ProgressContainer;
