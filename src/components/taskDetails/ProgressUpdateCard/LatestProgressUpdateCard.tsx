import { ProgressDetailsData } from '@/types/standup.type';
import React from 'react';

type Props = {
    data: ProgressDetailsData;
};
export default function LatestProgressUpdateCard({ data }: Props) {
    return <div>{data.completed}</div>;
}
