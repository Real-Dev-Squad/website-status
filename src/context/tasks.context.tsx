import fetch from "@/helperFunctions/fetch";
import React, { createContext, useContext ,useState, useEffect, SetStateAction, Dispatch, useCallback} from "react";
import levelType from "@/interfaces/level.type";
import tagType from "@/interfaces/tag.type";
import { ALL_LEVELS_URL,ALL_TAGS_URL } from "@/components/constants/url";
import { FilteredTasks, Tab, TabState } from '@/interfaces/task.type';
import task from '@/interfaces/task.type';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { TASKS_URL } from '@/components/constants/url';

export type TaskContextType = {
    taskTags: tagType[] | null,
    taskLevels: levelType[] | null,
    filteredTasks: FilteredTasks | null,
    activeTab: TabState,
    setActiveTab: Dispatch<SetStateAction<TabState>>
    setFilteredTasks: Dispatch<SetStateAction<FilteredTasks | null>>
    updateCardContent: (id: string, cardDetails: task) => Promise<void>
}

const TasksContext = createContext<TaskContextType | undefined>(undefined)

export const TasksProvider = ({children }: { children: React.ReactNode })=> {
    const [taskTags, setTaskTags] = useState<tagType[] | null>(null)
    const [taskLevels, setTaskLevels] = useState<levelType[] | null>(null)
    const [ filteredTasks, setFilteredTasks ] = useState<FilteredTasks | null>(null)
    const [activeTab, setActiveTab] = useState<TabState>(Tab.ASSIGNED)
    const { SUCCESS, ERROR } = ToastTypes;
    
    useEffect(() => {
           (async() => {
               const { requestPromise } = fetch({
                url: ALL_TAGS_URL
            })
            const { data } = await requestPromise;
            setTaskTags(data.tags)
        })();
        
        (async() => {
            const { requestPromise } = fetch({
                url: ALL_LEVELS_URL
            })
            const { data } = await requestPromise;
            const sortedTaskLevels = (data.levels).sort((a: levelType,b: levelType) => a.value < b.value ? -1 : 1 )
            setTaskLevels(sortedTaskLevels)
        })();
    },[])
    
    const updateCardContent = useCallback(async (id: string, cardDetails: task) => {
        try {
          const { requestPromise } = fetch({
            url: `${TASKS_URL}/${id}`,
            method: 'patch',
            data: cardDetails,
          });
          await requestPromise;
          toast(SUCCESS, 'Changes have been saved !');
        } catch (err: any) {
          if ('response' in err) {
            toast(ERROR, err.response.data.message);
            return;
          }
          toast(ERROR, err.message);
        }
      }, [])
  
    const value={
        taskTags,
        taskLevels,
        activeTab,
        setActiveTab,
        filteredTasks,
        setFilteredTasks,
        updateCardContent
    }

    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
} 

export const useTasksContext = () => {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error('useTasksContext must be used within a TasksProvider')
    }
    return context;
}