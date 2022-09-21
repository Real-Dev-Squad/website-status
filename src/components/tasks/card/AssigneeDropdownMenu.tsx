import { FC, useState, useEffect, useMemo } from "react";

import userType from '@/interfaces/user.type';
import { ALL_USERS } from '@/components/constants/url';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';

import classNames from '@/components/tasks/card/card.module.scss';

type Props = {
  updateAssignee: (username: string) => void
}

//https://github.com/Real-Dev-Squad/website-status/issues/303

const AssigneeDropdownMenu: FC<Props> = ({ updateAssignee }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [assigneeList, setAssigneeList] = useState([])
  const { ERROR } = ToastTypes;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { requestPromise } = fetch({ url: ALL_USERS });
        const { data } = await requestPromise;
        const usersData = data.members || data.users
        setAssigneeList(usersData)
      } catch (err: any) {
        toast(ERROR, err.message);
      }
    };
    fetchData();

  }, []);

  useEffect(() => {
    if (searchValue) {
      const newFilteredList = assigneeList.filter((member: userType) => (
        member.username?.toLowerCase().includes(searchValue.toLowerCase())
      ));
      console.log(newFilteredList)
      setFilteredList(newFilteredList)
    }
    else {
      setFilteredList([])
    }
  }, [searchValue])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <div className={classNames.dropdownMenu}>
        <label htmlFor="assigneeDropdownMenu">
          <input
            id="assigneeDropdownMenu"
            key="assigneeDropdownMenu"
            value={searchValue}
            type="search"
            placeholder='search for members'
            autoComplete="off"
            onChange={onChangeHandler} />
        </label>
        <div className={searchValue && classNames.assigneeMenu}>
          <ul className={classNames.assigneeList}>
            {filteredList &&
              filteredList.map((user: userType) => (
                <li key={user.id}
                  className={`${classNames.userName}`}
                  onClick={() => updateAssignee(user.username!)}>
                  {user.username}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default AssigneeDropdownMenu;