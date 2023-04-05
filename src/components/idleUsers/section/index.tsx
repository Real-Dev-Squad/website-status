import { FC } from "react";
import Card from "@/components/idleUsers/card";
import classNames from "@/components/idleUsers/section/section.module.scss";
import { UserStatusArray, UserStatus } from "@/interfaces/userStatus.type";

function renderCards(content: UserStatus[]) {
    return content.map((idleUser) => (
        <Card user={idleUser} key={idleUser.id} />
    ));
}

const Section: FC<UserStatusArray> = ({
    heading,
    content,
    error,
    isLoading,
}) => (
    <div className={classNames.section}>
        <div className={classNames.heading}>{heading}</div>
        {!!error && (
            <span className={classNames.statusMessage}>
                Something went wrong, please contact admin!
            </span>
        )}
        {isLoading ? (
            <span className={classNames.statusMessage}>Loading...</span>
        ) : (
            <div className={classNames.cardContainer}>
                {renderCards(content)}
            </div>
        )}
    </div>
);

export default Section;
