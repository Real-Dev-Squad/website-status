import { FC } from 'react';
import Card from '@/components/issues/Card';
import { IssueItem } from '@/interfaces/issueItem.type';

type IssueListProps = {
    list: IssueItem[];
};

const IssueList: FC<IssueListProps> = ({ list = [] }) => {
    return (
        <>
            {list.map((issue: IssueItem) => (
                <Card key={issue.id} issue={issue} />
            ))}
        </>
    );
};

export default IssueList;
