import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { useTasksContext } from "@/context/tasks.context";
import UserList from "./UserList";

import classNames from '@/components/tasks/card/card.module.scss';

type UserSearchPropsType = {
    currentAssignee: string | undefined,
      cardId: string,
      onContentChange: (changeId: string, changeObject: object) => void 
}

const UserSearch = ({ 
    currentAssignee,
    cardId,
    onContentChange
    }: UserSearchPropsType) => {

    const [searchInput, setSearchInput] = useState<string>()
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const [isSearchBarDisplayed, setIsSearchBarDisplayed] = useState<boolean>(false)
    const [debouncedSearchTerm, setDebounceSearchTerm] = useState<string>()
    const { filteredTasks, setFilteredTasks, activeTab } = useTasksContext()
    
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value.toLowerCase())
        if(!debouncedSearchTerm) setDebounceSearchTerm(e.target.value)
        else {
            clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => {
                    setDebounceSearchTerm(e.target.value.toLowerCase())
            },500)
        }
    }
    
    const onClickUsername = async (username: string) => {
        if(filteredTasks){
            await onContentChange(cardId, { assignee: username })
            let newTaskList = filteredTasks[activeTab].map(el => {
               return el.id === cardId ? {...el, assignee: username} : el
            })

            setFilteredTasks(prev => (prev ? {
                ...prev,
                [activeTab]: newTaskList
            } : prev))
            setIsSearchBarDisplayed(false)
        }
    } 

    return(
        <div style={{ position: "relative" }}>
            {!isSearchBarDisplayed &&
             <button style={{ display: "flex", gap: "0.25rem", alignItems: "center" }} onClick={() => setIsSearchBarDisplayed(true)}>{currentAssignee || "add"} 
            <span>
                <Image
                    src="/pencil.webp"
                    alt="pencil icon"
                    width={24}
                    height={24}
                />
            </span>
            </button>}
            {isSearchBarDisplayed && <input
                type="search"
                onChange={onChangeHandler}
                value={searchInput}
            />}

         {(debouncedSearchTerm && isSearchBarDisplayed) && 
            <div className={classNames.assigneeList}>
                <UserList onClickUsername={onClickUsername} searchString={debouncedSearchTerm} />        
            </div>
        }
        </div>
    )
}

export default UserSearch;