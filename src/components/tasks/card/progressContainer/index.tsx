import { FC, useRef, useState } from 'react';
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
import { CompletionModal } from '@/components/Modal/CompletionModal';
import { ERROR_MESSAGE, PROGRESS_SUCCESSFUL } from '@/constants/constants';
import styles from '@/components/tasks/card/card.module.scss';
import { ProgressContainerProps } from '@/interfaces/task.type';

const ProgressContainer: FC<ProgressContainerProps> = ({
    content,
    readOnly = false,
}) => {
    const router = useRouter();
    const { dev } = router.query;
    const isDev = dev === 'true';

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isProgressMade, setIsProgressMade] = useState<boolean>(false);
    const [progressValue, setProgressValue] = useState<number>(
        content.percentCompleted
    );
    const [showCompletionModal, setShowCompletionModal] = useState(false);

    const { isUserAuthorized } = useUserData();
    const { data: userData } = useGetUserQuery();
    const [updateTask, { isLoading: isLoadingUpdateTaskDetails }] =
        useUpdateTaskMutation();
    const [updateSelfTask, { isLoading: isLoadingSelfTaskUpdate }] =
        useUpdateSelfTaskMutation();

    const checkingLoading =
        isLoadingUpdateTaskDetails || isLoadingSelfTaskUpdate;

    const { SUCCESS, ERROR } = ToastTypes;

    const handleSliderChangeComplete = async (
        id: string,
        percentCompleted: number
    ) => {
        const taskData = {
            percentCompleted: percentCompleted,
        };

        try {
            const updateResponse = await (isUserAuthorized
                ? updateTask({ task: taskData, id: id })
                : updateSelfTask({ task: taskData, id: id })
            ).unwrap();

            toast(SUCCESS, PROGRESS_SUCCESSFUL);
            if (percentCompleted === 100 && isDev) {
                setShowCompletionModal(true);
            }
        } catch (error) {
            toast(ERROR, ERROR_MESSAGE);
        }
    };

    const onProgressChange = () => {
        handleSliderChangeComplete(content.id, progressValue);
        setIsProgressMade(false);
    };

    const debounceSlider = (debounceTimeOut: number) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            onProgressChange();
        }, debounceTimeOut);
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

    const closeCompletionModal = () => {
        setShowCompletionModal(false);
    };

    const showUpdateButton = () => {
        if (
            !readOnly &&
            (content.assignee === userData?.username ||
                !!userData?.roles.super_user)
        ) {
            return (
                <ProgressText
                    handleProgressUpdate={handleProgressUpdate}
                    isLoading={checkingLoading}
                />
            );
        }
        return null;
    };

    return (
        <>
            <div className={styles.progressContainerUpdated}>
                <Progressbar
                    progress={!readOnly && isProgressMade}
                    progressValue={progressValue}
                    percentCompleted={content.percentCompleted}
                    handleProgressChange={handleProgressChange}
                    debounceSlider={debounceSlider}
                    startedOn={content.startedOn}
                    endsOn={String(content.endsOn)}
                    isLoading={checkingLoading}
                    readOnly={readOnly}
                />
                {showUpdateButton()}
            </div>

            {isDev && (
                <CompletionModal
                    isOpen={showCompletionModal}
                    onClose={closeCompletionModal}
                />
            )}
        </>
    );
};

export default ProgressContainer;
