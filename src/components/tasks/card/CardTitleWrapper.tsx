import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface CardTitleWrapperProps {
    children?: ReactNode;
    condition: boolean;
    to?: string;
    taskId?: string;
}

export const CardTitleWrapper: FC<CardTitleWrapperProps> = ({
    children,
    condition,
    to,
    taskId,
}) => {
    if (!!condition && to) {
        return (
            <Link
                href={{
                    pathname: '/tasks/[id]',
                }}
                as={`/tasks/${taskId}`}
                style={{ textDecoration: 'none' }}
            >
                {children}
            </Link>
        );
    }

    return <>{children}</>;
};
