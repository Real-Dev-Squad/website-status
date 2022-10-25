import React, { useState } from "react";

import { CATEGORY, LEVEL } from '../../constants/task-level';
import classNames from '@/components/tasks/card/card.module.scss';
import task from "@/interfaces/task.type";

type TaskTagPropsType = {
    level?: number
    category?: string
    handleChange: (event: any,changedProperty: keyof task) => void
}

const TaskTagEdit = ({ level,category,handleChange }: TaskTagPropsType) => {
    const [levelValue, setLevelValue] = useState(level)
    const [categoryValue, setCategoryValue] = useState(category)
    
    return(
        <>
        <div className={classNames.taskTagEditItems}>
             <label htmlFor="select-category"><span className={classNames.srOnly}>Update category of the task</span></label>
            <div className={classNames.selectWrapper}>
                <select id="select-category"
                        name="categories"
                        value={categoryValue}
                        onChange={(e) =>{
                            setCategoryValue(e.target.value)
                            handleChange(e,'category')
                        } }
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
            
        <div className={classNames.taskTagEditItems}>
           <label htmlFor="select-level"><span className={classNames.srOnly}>Update Level of the task</span></
           label>
           <div className={classNames.selectWrapper}>  
                <select id="select-level"
                        name="level"
                        value={levelValue}
                        onChange={(e) =>{
                            setLevelValue(Number(e.target.value))
                            handleChange(e,'level')
                        } }
                        className={classNames.selectDropdown}>
                    <option disabled selected>--update level--</option>
                    {
                        LEVEL.options.map(optionValue => (
                            <option key={optionValue} disabled={!categoryValue} value={optionValue}>Level - {optionValue}</option>
                        ))
                    }
                </select>
           </div>
        </div> 
        </>)
}

export default TaskTagEdit;