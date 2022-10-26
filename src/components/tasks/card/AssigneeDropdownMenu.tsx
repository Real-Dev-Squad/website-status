import { FC, useState, SetStateAction } from "react";
import userType from '@/interfaces/user.type';
import classNames from '@/components/tasks/card/card.module.scss';

type Props = {
  cardDetails: any
  allUsers: any
  updateAssignee: (username: string) => void
  setisAssigneeDropdownOpen: React.Dispatch<SetStateAction<boolean>>
}

//https://github.com/Real-Dev-Squad/website-status/issues/303

const AssigneeDropdownMenu: FC<Props> = ({ cardDetails,updateAssignee,setisAssigneeDropdownOpen, allUsers }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    if (e.target.value) {
      const newFilteredList = allUsers.filter((user: userType) => (
        user.username?.toLowerCase().includes(e.target.value.toLowerCase())
      ));
      setFilteredList(newFilteredList)
    }
    else {
      setFilteredList([])
    }
  }

  return (
    <>
      <div className={classNames.dropdownMenu}>
        <label htmlFor="assigneeInput"></label>
        <div className={classNames.assigneeInputWrapper}>
          <span className={classNames.currentAssignee}>
            <span className={classNames.currentAssigneeName}>
            {cardDetails.assignee ? cardDetails.assignee : <b><em>Unassigned</em></b>}
            </span>
          <button aria-label="close input search box"
                  onClick={() => setisAssigneeDropdownOpen((prev) => !prev)}>&times;</button>
          </span>
          
          <input
            id="assigneeInput"
            value={searchValue}
            type="search"
            placeholder='search for members'
            autoComplete="off"
            className={classNames.assigneeInput}
            onChange={onChangeHandler} />
        </div>
        
        {filteredList.length > 0 &&  
        <div className={searchValue && classNames.assigneeMenu}>
          <ul className={classNames.assigneeList}>
            {
              filteredList.map((user: userType) => (
                <li key={user.id}
                  className={classNames.userName}
                  onClick={() => updateAssignee(user.username!)}>
                  {user.username}
                </li>
              ))
            }
          </ul>
        </div>
        }
      </div>
    </>
  )
}

export default AssigneeDropdownMenu;