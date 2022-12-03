import React, { useState } from "react";

import classNames from '@/components/tasks/card/card.module.scss';
import { useTasksContext } from '@/context/tasks.context';
import levelType from "@/interfaces/level.type";
import tagType from "@/interfaces/tag.type";
import taskItem from "@/interfaces/taskItem.type";
import { toast,ToastTypes } from "@/helperFunctions/toast";

type TaskTagPropsType = {
    taskTagLevel: taskItem[] | undefined
    updateTaskTagLevel: (taskItemToUpdate: taskItem, method: 'delete' | 'post') => void
}

type SelectComponentPropsType = {
    options: levelType[] | tagType[]
    name: 'tags' | 'levels'
    defaultOption: '--new tag--' | '--new level--'
    setNewValueOnChange: React.Dispatch<React.SetStateAction<string | undefined>>
    id: string
    label: string
    value: string | undefined
}


const SelectComponent = ({ label,
    id,
    setNewValueOnChange,
    defaultOption,
    options,
    name,
    value }: SelectComponentPropsType) => {

return (
    <div>
        <label htmlFor={id}><span className={classNames.screenReaderOnly}>{label}</span></label>
        <div className={classNames.selectWrapper}>
            <select id={id}
                name={name}
                value={value}
                onChange={(e) =>{
                    setNewValueOnChange(e.target.value)
                }}
                className={classNames.selectDropdown}>
            <option disabled selected>{defaultOption}</option>
            {
                options?.map(option => (
                    <option key={option.name} value={option.name}>
                        {name === "levels" 
                            ? `Level - ${option.name}`
                            : option.name
                        }
                    </option>
                ))
            }
            </select>
        </div>
    </div>
)
}

const TaskTagEdit = ({ updateTaskTagLevel,taskTagLevel }: TaskTagPropsType) => {
    const [newLevelValue, setNewLevelValue] = useState<string>()
    const [newTagValue, setNewTagValue] = useState<string>()
    const { taskLevels, taskTags } = useTasksContext()
    const { ERROR } = ToastTypes
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tagToAdd = taskTags?.find(tag => tag.name === newTagValue)
        const levelToAdd = taskLevels?.find(level => level.name === newLevelValue)
        const isTagExists = taskTagLevel?.find((tagLevel) => {
           return tagLevel.tagId === tagToAdd?.id
        })
        if(newTagValue && newLevelValue) {
        if(isTagExists){
            toast(ERROR,`Tag with Level already exists`);
            return;
        }
            if(levelToAdd && tagToAdd){
                const taskItemToUpdate: taskItem = {
                    levelId: levelToAdd.id,
                    levelName: levelToAdd.name,
                    tagId: tagToAdd.id,
                    tagName: tagToAdd.name,
                    tagType: "SKILL",
                    levelNumber: levelToAdd.levelNumber
                }
                updateTaskTagLevel(taskItemToUpdate, 'post')
            } else {
                toast(ERROR, `Tag and Level values are missing`)
            }
        } else {
            toast(ERROR, `Tag and Level values both needed`)
        }
    }
    if (taskLevels && taskTags){
    return(
        <>
                <form className={classNames.addTaskTagLevel} onSubmit={handleSubmit}>
                <SelectComponent 
                    defaultOption="--new tag--"
                    id="select-tag"
                    label="select tag"
                    value={newTagValue}
                    name="tags"
                    options={taskTags}
                    setNewValueOnChange={setNewTagValue}
                />
                <SelectComponent 
                    defaultOption="--new level--"
                    id="select-level"
                    label="select level"
                    value={newLevelValue}
                    name="levels"
                    options={taskLevels}
                    setNewValueOnChange={setNewLevelValue}
                />
                <button>Add</button>
            </form>
        </>)
    }
    return null
}

export default TaskTagEdit;