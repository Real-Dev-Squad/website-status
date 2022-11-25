import React, { useState } from "react";

import classNames from '@/components/tasks/card/card.module.scss';
import { useTasksContext } from '@/context/tasks.context';
import { TAG_TYPE, ITEM_TYPE } from '@/components/constants/items';
import levelType from "@/interfaces/level.type";
import tagType from "@/interfaces/tag.type";
import { toast,ToastTypes } from "@/helperFunctions/toast";

type TaskTagPropsType = {
    updateTaskTagLevel: (taskItemToUpdate: any, method: 'delete' | 'post') => void
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

const TaskTagEdit = ({ updateTaskTagLevel }: TaskTagPropsType) => {
    const [newlevelValue, setNewLevelValue] = useState<string>()
    const [newTagValue, setNewTagValue] = useState<string>()
    const { taskLevels, taskTags } = useTasksContext()
    const { ERROR } = ToastTypes
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tagToAdd = taskTags?.find(tag => tag.name === newTagValue)
        const levelToAdd = taskLevels?.find(level => level.name === newlevelValue)
        if(newTagValue && newlevelValue){
            const taskItemToUpdate = {
                itemtype: ITEM_TYPE.TASK,
                levelid: levelToAdd?.id,
                levelname: levelToAdd?.name,
                tagid: tagToAdd?.id,
                tagname: tagToAdd?.name,
                tagtype: TAG_TYPE.SKILL
            }
            updateTaskTagLevel(taskItemToUpdate, 'post')
        } else {
            toast(ERROR, `Tag and level values both needed`)
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
                    value={newlevelValue}
                    name="levels"
                    options={taskLevels}
                    setNewValueOnChange={setNewLevelValue}
                />
                <button>Add</button>
            </form>
            
        </>)
    } else {
        return null
    }
}

export default TaskTagEdit;