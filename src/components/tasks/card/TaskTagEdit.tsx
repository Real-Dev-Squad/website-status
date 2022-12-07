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
    setNewValueOnChange: React.Dispatch<React.SetStateAction<any>>
    id: string
    label: string
    value: string | number | undefined
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
                    <option key={option.id} value={option.name}>
                        {name === "levels" 
                            ? `Level - ${(option as levelType).value}`
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
    const [newLevelValue, setNewLevelValue] = useState<number>()
    const [newTagValue, setNewTagValue] = useState<string>()
    const { taskLevels: levelOptions, taskTags } = useTasksContext()
    const { ERROR } = ToastTypes
    let tagOptions = taskTags;
    // filtering out tag options: if a skill is present then to remove it from the options
    (taskTagLevel && taskTags)
    &&
    taskTags.forEach((tag) => {
        taskTagLevel.forEach(item => {
            if(item.tagName === tag.name){
                tagOptions = tagOptions && tagOptions.filter((tag) => tag.name !== item.tagName)
            }
        })
    })
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tagToAdd = tagOptions?.find(tag => tag.name === newTagValue)
        const levelToAdd = levelOptions?.find(level => level.value == newLevelValue)

        if(newTagValue && newLevelValue) {
            if(levelToAdd && tagToAdd){
                const taskItemToUpdate: taskItem = {
                    levelId: levelToAdd.id,
                    levelName: levelToAdd.name,
                    tagId: tagToAdd.id,
                    tagName: tagToAdd.name,
                    tagType: "SKILL",
                    levelValue: levelToAdd.value
                }
                updateTaskTagLevel(taskItemToUpdate, 'post')
            } else {
                toast(ERROR, `Tag and Level values are missing`)
            }
        } else {
            toast(ERROR, `Tag and Level values both needed`)
        }
    }
    if (levelOptions && tagOptions){
    return(
        <>
                <form className={classNames.addTaskTagLevel} onSubmit={handleSubmit}>
                <SelectComponent 
                    defaultOption="--new tag--"
                    id="select-tag"
                    label="select tag"
                    value={newTagValue}
                    name="tags"
                    options={tagOptions}
                    setNewValueOnChange={setNewTagValue}
                />
                <SelectComponent 
                    defaultOption="--new level--"
                    id="select-level"
                    label="select level"
                    value={newLevelValue}
                    name="levels"
                    options={levelOptions}
                    setNewValueOnChange={setNewLevelValue}
                />
                <button className={classNames.addTagLevelBtn}>Add</button>
            </form>
        </>)
    }
    return null
}

export default TaskTagEdit;