import { FC, ReactNode } from 'react';
import Link from 'next/link';
import classNames from '@/components/tasks/Card/card.module.scss';

interface ConditionalLinkWrapperProps {
    children?: ReactNode;
    shouldDisplayLink: boolean;
    redirectingPath?: string;
    taskId?: string;
}

export const ConditionalLinkWrapper: FC<ConditionalLinkWrapperProps> = ({
    children,
    shouldDisplayLink,
    redirectingPath,
    taskId,
}) => {
    if (shouldDisplayLink && redirectingPath) {
        return (
            <Link
                href={{
                    pathname: redirectingPath,
                }}
                as={`/tasks/${taskId}`}
                className={classNames.cardTitle}
            >
                {children}
            </Link>
        );
    }

    return <>{children}</>;
};
