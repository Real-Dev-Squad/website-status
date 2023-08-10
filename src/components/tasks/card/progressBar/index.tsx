import { FC, useState } from 'react';
import { useRouter } from 'next/router';

import { toast, ToastTypes } from '@/helperFunctions/toast';
import {
    useUpdateSelfTaskMutation,
    useUpdateTaskMutation,
} from '@/app/services/tasksApi';
import useUserData from '@/hooks/useUserData';
import { useGetUserQuery } from '@/app/services/userApi';

import HandleProgressText from './ProgressText';
import HandleProgressbar from './ProgressBar';
import { ERROR_MESSAGE, PROGRESS_SUCCESSFUL } from '@/constants/constants';

import classNames from '@/components/tasks/card/card.module.scss';
import { ProgressContainerProps } from '@/interfaces/task.type';

const ProgressContainer: FC<ProgressContainerProps> = ({ content }) => {
    const router = useRouter();
    const { dev } = router.query;

    const cardDetails = content;

    const [progress, setProgress] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState<number>(0);

    const { isUserAuthorized } = useUserData();
    const { data } = useGetUserQuery();
    const [updateTask, { isLoading: isLoadingUpdateTaskDetails }] =
        useUpdateTaskMutation();
    const [updateSelfTask, { isLoading: isLoadingSelfTaskUpdate }] =
        useUpdateSelfTaskMutation();

    const { SUCCESS, ERROR } = ToastTypes;

    const handleSliderChangeComplete = async (
        id: string,
        percentCompleted: number
    ) => {
        const data = {
            percentCompleted: percentCompleted,
        };
        if (isUserAuthorized) {
            await updateTask({
                task: data,
                id: id,
            })
                .unwrap()
                .then(() => toast(SUCCESS, PROGRESS_SUCCESSFUL))
                .catch(() => toast(ERROR, ERROR_MESSAGE));
        } else {
            await updateSelfTask({ task: data, id: id })
                .unwrap()
                .then(() => toast(SUCCESS, PROGRESS_SUCCESSFUL))
                .catch(() => toast(ERROR, ERROR_MESSAGE));
        }
    };

    const progressDebounce = () => {
        handleSliderChangeComplete(cardDetails.id, progressValue);
        setProgress(false);
    };

    const debounceSlider = (debounceTimeOut: number) => {
        if (debounceTimeOut) {
            clearTimeout(debounceTimeOut);
        }
        setTimeout(() => {
            progressDebounce();
        }, 1000);
    };

    const handleProgressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setProgressValue(Number(event.target.value));
    };

    const handleProgressUpdate = () => {
        if (
            content.assignee === data?.username ||
            data?.roles.super_user === true
        ) {
            setProgress(true);
        } else {
            toast(ERROR, 'You cannot update progress');
        }
    };
    return (
        <>
            <div className={classNames.progressContainerUpdated}>
                <HandleProgressbar
                    progress={progress}
                    progressValue={progressValue}
                    percentCompleted={content.percentCompleted}
                    handleProgressChange={handleProgressChange}
                    debounceSlider={debounceSlider}
                    startedOn={content.startedOn}
                    endsOn={String(content.endsOn)}
                    isLoading={
                        isLoadingUpdateTaskDetails || isLoadingSelfTaskUpdate
                    }
                />
            </div>
            {dev === 'true' && (
                <HandleProgressText
                    handleProgressUpdate={handleProgressUpdate}
                    isLoading={
                        isLoadingUpdateTaskDetails || isLoadingSelfTaskUpdate
                    }
                />
            )}
        </>
    );
};

export default ProgressContainer;
