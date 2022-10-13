import React, { useState} from "react";

import { CATEGORY, LEVEL } from '../../constants/task-level';
import TaskLevelType from "@/interfaces/taskLevel.type";
import classNames from '@/components/tasks/card/card.module.scss';

type TaskLevelPropsType = {
    taskLevel?: TaskLevelType
    updateTaskLevelItems: (newTaskLevelValue: TaskLevelType) => void
}

const TaskLevelEdit = ({ taskLevel, updateTaskLevelItems }: TaskLevelPropsType) => {
    const [taskLevelValue, setTaskLevelValue] = useState(taskLevel ? taskLevel : {} as TaskLevelType)
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>,changedProperty: keyof typeof taskLevelValue) => {
        if(changedProperty === 'category'){
            const newTaskLevelValue = ({...taskLevelValue,[changedProperty] : e.target.value})
            updateTaskLevelItems(newTaskLevelValue)
            setTaskLevelValue(newTaskLevelValue)
        }
        if(changedProperty === 'level'){
            const newTaskLevelValue = ({...taskLevelValue,[changedProperty] : Number(e.target.value)})
            updateTaskLevelItems(newTaskLevelValue)
            setTaskLevelValue(newTaskLevelValue)
        }
    }
    
    return(
        <>
        <span className={classNames.cardSpecialFont}>Task level:</span>
        <div className={classNames.taskLevelEditItems}>
            <span title="current category value" className={classNames.currentValue}>{taskLevelValue?.category 
                  ? taskLevelValue.category.toLowerCase()
                  : 'no category'}</span>
             <label htmlFor="select-category"><span className={classNames.srOnly}>Update category of the task</span></label>
            <div className={classNames.selectWrapper}>
                <select id="select-category"
                        name="categories"
                        value={taskLevelValue?.category}
                        onChange={(e) => handleChange(e,'category')}
                        className={classNames.selectDropdown}>
                    <option disabled selected>--update category--</option>
                    {
                        CATEGORY.options.map(optionValue => (
                            <option key={optionValue} value={optionValue}>{optionValue}</option>
                        ))
                    }
                </select>
            </div>
        </div>
            
        <div className={classNames.taskLevelEditItems}>
        <span title="current level value" className={classNames.currentValue}>{taskLevelValue?.level 
                  ? `level - ${taskLevelValue.level}`
                  : 'no level'}</span>
           <label htmlFor="select-level"><span className={classNames.srOnly}>Update Level of the task</span></
           label>
           <div className={classNames.selectWrapper}>  
                <select id="select-level"
                        name="level"
                        value={taskLevelValue?.level}
                        onChange={(e) => handleChange(e,'level')}
                        className={classNames.selectDropdown}>
                    <option disabled selected>--update level--</option>
                    {
                        LEVEL.options.map(optionValue => (
                            <option key={optionValue} disabled={!taskLevelValue.category} value={optionValue}>Level - {optionValue}</option>
                        ))
                    }
                </select>
           </div>
        </div> 
            
        </>
    )
}

export default TaskLevelEdit;