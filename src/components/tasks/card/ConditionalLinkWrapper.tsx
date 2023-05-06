import { FC, ReactNode } from 'react';
import Link from 'next/link';

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
                style={{ textDecoration: 'none' }}
            >
                {children}
            </Link>
        );
    }

    return <>{children}</>;
};
