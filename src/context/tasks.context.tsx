import fetch from "@/helperFunctions/fetch";
import React, { createContext, useContext ,useState, useEffect} from "react";
import levelType from "@/interfaces/level.type";
import tagType from "@/interfaces/tag.type";

export type TaskContextType = {
    taskTags: tagType[] | null,
    taskLevels: levelType[] | null
}

const TasksContext = createContext<TaskContextType>({
    taskTags: [],
    taskLevels: []
})

export const TasksProvider = ({children }: { children: React.ReactNode })=> {
    const [taskTags, setTaskTags] = useState<tagType[] | null>(null)
    const [taskLevels, setTaskLevels] = useState<levelType[] | null>(null)
    const ALL_TAGS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tags`;
    const ALL_LEVELS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/levels`;
    const value={
        taskTags,
        taskLevels
    }
    useEffect(() => {
           (async() => {
            const { requestPromise } = fetch({
                url: ALL_TAGS_URL
            })
            const { data } = await requestPromise;
            setTaskTags(data.allTags)
           })();
           
           (async() => {
            const { requestPromise } = fetch({
                url: ALL_LEVELS_URL
            })
            const { data } = await requestPromise;
            const sortedTaskLevels = (data.allLevels).sort((a: levelType,b: levelType) => {
                if(parseInt(a.name) < parseInt(b.name)) return -1;
                if(parseInt(a.name) > parseInt(b.name)) return 1;
                return 0
            }) 
            setTaskLevels(sortedTaskLevels)
           })();
    },[])
    
    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
} 

export const useTasksContext = () => {
    const context: TaskContextType = useContext(TasksContext)
    if (context===undefined) {
        throw new Error('useAppContext must be used within a CountProvider')
    }
    return context;
}