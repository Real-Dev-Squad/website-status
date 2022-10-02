import React, { useState, useRef } from "react";
import TaskLevelType from "@/interfaces/taskLevel.type";
import classNames from '@/components/tasks/card/card.module.scss';

type TaskLevelPropsType = {
    taskLevel?: TaskLevelType
    updateTaskLevelItems: (newTaskLevelValue: TaskLevelType) => void
}

const categories = {
    options: ["Frontend", "Backend", "System design"] as string[]
}

const level = {
    options: [1,2,3,4,5] as number[]
}

const TaskLevelEdit = ({ taskLevel, updateTaskLevelItems }: TaskLevelPropsType) => {
    const [taskLevelValue, setTaskLevelValue] = useState(taskLevel ? taskLevel : {} as TaskLevelType)
    
    const currentCategoryValueRefEl = useRef<HTMLElement>(null)
    const currentLevelValueRefEl = useRef<HTMLElement>(null)
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>,changedProperty: keyof typeof taskLevelValue) => {
        
        if(changedProperty === 'category'){
            const newTaskLevelValue = ({...taskLevelValue,[changedProperty] : e.target.value})
            if (currentCategoryValueRefEl.current !== null) {
                currentCategoryValueRefEl.current.innerText = e.target.value
              }
            updateTaskLevelItems(newTaskLevelValue)
            setTaskLevelValue(newTaskLevelValue)
        }
        if(changedProperty === 'level'){
            const newTaskLevelValue = ({...taskLevelValue,[changedProperty] : Number(e.target.value)})
            if (currentLevelValueRefEl.current !== null){
                currentLevelValueRefEl.current.innerText=`Level - ${e.target.value}`
            }
            updateTaskLevelItems(newTaskLevelValue)
            setTaskLevelValue(newTaskLevelValue)
        }
    }
    
    return(
        <>
        <span className={classNames.cardSpecialFont}>Task level:</span>
        <div className={classNames.taskLevelEditItems}>
            <span title="current category value" ref={currentCategoryValueRefEl} className={classNames.currentValue}>{taskLevel?.category 
                  ? taskLevel.category
                  : 'no category'}</span>
             <label htmlFor="select-category"></label>
            <select id="select-category"
                    name="categories"
                    value={taskLevelValue?.category}
                    onChange={(e) => handleChange(e,'category')}
                    className={classNames.selectDropdown}>
                <option disabled selected>--update category--</option>
                {
                    categories.options.map(optionValue => (
                        <option key={optionValue} value={optionValue.toLowerCase()}>{optionValue}</option>
                    ))
                }
            </select>
        </div>
            
        <div className={classNames.taskLevelEditItems}>
        <span title="current level value" ref={currentLevelValueRefEl} className={classNames.currentValue}>{taskLevel?.level 
                  ? `Level - ${taskLevel.level}`
                  : 'no level'}</span>
           <label htmlFor="select-level"></
           label>
            <select id="select-level"
                    name="level"
                    value={taskLevelValue?.level}
                    onChange={(e) => handleChange(e,'level')}
                    className={classNames.selectDropdown}>
                <option disabled selected>--update level--</option>
                {
                    level.options.map(optionValue => (
                        <option key={optionValue} value={optionValue}>Level - {optionValue}</option>
                    ))
                }
            </select>
        </div> 
            
        </>
    )
}

export default TaskLevelEdit;