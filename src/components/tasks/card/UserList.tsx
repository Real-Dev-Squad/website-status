import { useState, useEffect } from "react";

import { UsersResponse, useGetUsersByUsernameQuery } from "@/app/services/usersApi";
import UserType from "@/interfaces/user.type";
import { toast } from "@/helperFunctions/toast";

import classNames from '@/components/tasks/card/card.module.scss';

const UserList = ({ 
       searchString, 
       onClickUsername }: { 
        searchString: string,
        onClickUsername: (username: string) => Promise<void>  }) => {
    const [ paginatedLink, setPaginatedLink] = useState<string>()
    const { data, isLoading } = useGetUsersByUsernameQuery({
        searchString,
        paginatedLink
    })
    const [usersListData, setUsersListData] = useState<UsersResponse>()
    
    useEffect(() => {
        if(data?.users && data?.users?.length > 0) {
            setUsersListData(data)
        }
    },[data])

    const onPageClickHandler = (pageLink: "next" | "prev") => {
        setPaginatedLink(usersListData?.links[pageLink])
    }
    
    if(isLoading) {
        return <div>
            Loading...
        </div>
    }
    else if(!data){
        return null
    }

    return (
            <>
            <ul style={{ listStyle: "none"}}>
                {
                    usersListData?.users?.map((user) => (
                        <>
                        <li onClick={() => onClickUsername(user.username!)}>{user.username}</li>
                        </>
                    ))
                }
            
            </ul>
            <div className={classNames.pageBtnContainer}>
                <button className={classNames.cursor} aria-label="previous page" onClick={() => onPageClickHandler("prev")}>&lt;</button>
                <button className={classNames.cursor} aria-label="next-page" onClick={() => onPageClickHandler("next")}>&gt;</button>    
            </div>
            </>
    )
}

export default UserList;