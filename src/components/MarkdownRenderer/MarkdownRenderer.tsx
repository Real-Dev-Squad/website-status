import React from 'react';
import Markdown from 'markdown-to-jsx';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    content,
    className,
}) => {
    return <Markdown className={className}>{content}</Markdown>;
};

export default MarkdownRenderer;
