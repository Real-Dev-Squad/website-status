import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface CardTitleWrapperProps {
    children?: ReactNode;
    condition: boolean;
    to?: string;
    taskId?: string;
}

interface InternalLinkProps {
    href: {
        pathname: string;
    };
    children: ReactNode;
    id?: string;
}

const InternalLink = ({ href, id, children }: InternalLinkProps) => {
    return (
        <Link
            href={href}
            as={`/tasks/${id}`}
            style={{ textDecoration: 'none' }}
        >
            {children}
        </Link>
    );
};

export const CardTitleWrapper: FC<CardTitleWrapperProps> = ({
    children,
    condition,
    to,
    taskId,
}) => {
    return !!condition && to ? (
        <InternalLink
            href={{
                pathname: '/tasks/[id]',
            }}
            id={taskId}
        >
            {children}
        </InternalLink>
    ) : (
        <>{children}</>
    );
};
