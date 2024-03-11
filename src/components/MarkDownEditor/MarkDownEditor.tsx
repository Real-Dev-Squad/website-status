import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { ChangeEvent, useState } from 'react';

interface MarkDownEditorProps {
    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    editorClassName?: string;
    previewClassName?: string;
}

// This is a markdown editor with preview functionality
const MarkDownEditor: React.FC<MarkDownEditorProps> = ({
    onChange,
    editorClassName,
    previewClassName,
}) => {
    const [markdown, setMarkdown] = useState('');
    const [mode, setMode] = useState<'description' | 'preview'>('description');

    const handleClick = () => {
        if (mode == 'preview') {
            setMode('description');
        } else {
            setMode('preview');
        }
    };

    const getActivePaneLabel = () => {
        return mode === 'preview' ? 'Edit' : 'Preview';
    };

    return (
        <div className="markdown-editor">
            <div className="pane-tabs">
                <button type="button" onClick={() => handleClick()}>
                    {getActivePaneLabel()}
                </button>
            </div>
            <div className="markdown-editor">
                {mode === 'description' && (
                    <div className="description-box">
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Why do you want this task?"
                            className={editorClassName}
                            value={markdown}
                            onChange={(e) => {
                                if (onChange) {
                                    onChange(e);
                                }
                                setMarkdown(e.target.value);
                            }}
                        />
                    </div>
                )}
                {mode === 'preview' && (
                    <div>
                        <Markdown className={previewClassName}>
                            {markdown}
                        </Markdown>
                    </div>
                )}
            </div>
        </div>
    );
};

MarkDownEditor.propTypes = {
    onChange: PropTypes.func,
    editorClassName: PropTypes.string,
    previewClassName: PropTypes.string,
};

export default MarkDownEditor;
