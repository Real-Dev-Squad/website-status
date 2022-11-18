import React, { useState } from "react";

import classNames from '@/components/tasks/card/card.module.scss';
import { useTasksContext } from '@/context/tasks.context';


type TaskTagPropsType = {
    updateTaskTagLevel: (body: any, method: 'delete' | 'post') => void
}

const TaskTagEdit = ({ updateTaskTagLevel }: TaskTagPropsType) => {
    const [newlevelValue, setNewLevelValue] = useState<string>()
    const [newTagValue, setNewTagValue] = useState<string>()
    const { taskLevels, taskTags } = useTasksContext()
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tagToAdd = taskTags?.find(tag => tag.name === newTagValue)
        const levelToAdd = taskLevels?.find(level => level.name === newlevelValue)
        const body = { 
            itemType: "TASK",
            tagPayload: [{
                levelid: levelToAdd?.id,
                tagid: tagToAdd?.id
            }]
        }
        updateTaskTagLevel(body, 'post')
    }
    
    return(
        <>
                <form className={classNames.addTaskTagLevel} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="select-tag"><span className={classNames.srOnly}>select tag</span></label>
                    <div className={classNames.selectWrapper}>
                        <select id="select-tag"
                                name="tags"
                                value={newTagValue}
                                onChange={(e) =>{
                                    setNewTagValue(e.target.value)
                                }}
                                className={classNames.selectDropdown}>
                            <option disabled selected>--new tag--</option>
                            {
                                taskTags?.map(tag => (
                                    <option key={tag.name} value={tag.name}>{tag.name}</option>
                                    ))
                            }
                    </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="select-level"><span className={classNames.srOnly}>select level</span></label>
                    <div className={classNames.selectWrapper}>  
                    <select id="select-level"
                            name="levels"
                            value={newlevelValue}
                            onChange={(e) =>{
                                setNewLevelValue(e.target.value)
                            }}
                            className={classNames.selectDropdown}>
                        <option disabled selected>--new level--</option>
                        {
                            taskLevels?.map(level => (
                                <option key={level.name} disabled={!newTagValue} value={level.name}>Level - {level.name}</option>
                                ))
                            }
                    </select>
                    </div>
                </div>
                <button>Add</button>
            </form>
            
        </>)
}

export default TaskTagEdit;