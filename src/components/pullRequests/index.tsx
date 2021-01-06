import { FunctionComponent, useState } from 'react';
import classNames from './pullRequests.module.scss';

interface prData {
    title: string,
    username: string,
    createdAt: string,
    updatedAt: string,
    url: string
};

const pullRequest: FunctionComponent<prData> = ({ title, username, createdAt, updatedAt, url }) => {
    const created = new Date(createdAt), updated = new Date(updatedAt), presentDate = new Date();
    const createdAgo = Math.ceil((presentDate.getTime() - created.getTime()) / (1000 * 3600 * 24)) + 'days ago';
    const updatedAgo = Math.ceil((presentDate.getTime() - updated.getTime()) / (1000 * 3600 * 24)) + 'days ago';
    const [createdTime, updateCreatedTime] = useState(createdAgo);
    const [updatedTime, updateUpdatedTime] = useState(updatedAgo);

    return (
        <div className={classNames.pullRequest}>
            <div className={classNames.prTitle}><span className={classNames.title}>Title:</span>{title}</div>
            <div className={classNames.statusLable}>
                Created by: <span className={classNames.infoEl}>{username}</span>
            </div>
            <div className={classNames.statusLable}>
                Created: <span
                    className={classNames.infoEl}
                    onMouseEnter={() => { updateCreatedTime(created.toLocaleString()) }}
                    onMouseLeave={() => { updateCreatedTime(createdAgo) }}>{createdTime}</span>
            </div>
            <div className={classNames.statusLable}>
                Updated: <span
                    className={classNames.infoEl}
                    onMouseEnter={() => { updateUpdatedTime(updated.toLocaleString()) }}
                    onMouseLeave={() => { updateUpdatedTime(updatedAgo) }}>{updatedTime}</span>
            </div>
            <div className={classNames.linkCt}>
                <a className={classNames.prLink} href={url} target="_blank">Open PR in Github</a>
            </div>
        </div>
    );
};

export default pullRequest;