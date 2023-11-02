import React, { FC, useState } from 'react';
import styles from '@/components/Inputs/input.module.scss';
import Image from 'next/image';

interface ClipboardCopyProps {
    copyText: string;
}

const ClipboardCopy: FC<ClipboardCopyProps> = (props) => {
    const [isCopied, setIsCopied] = useState(false);

    const { copyText } = props;

    const copyTextToClipboard = async (text: string) => {
        return await navigator.clipboard.writeText(text);
    };

    const handleCopyClick = () => {
        copyTextToClipboard(copyText)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className={styles.clipboardInputContainer}>
            <input
                type="text"
                className={styles.clipboardInput}
                value={copyText}
                readOnly
            />
            <button
                className={styles.clipboardIconButton}
                onClick={handleCopyClick}
            >
                {isCopied ? (
                    <Image
                        src="/clipboard-check.svg"
                        alt="Clipboard check icon"
                        width={24}
                        height={24}
                    />
                ) : (
                    <Image
                        src="/clipboard.svg"
                        alt="Clipboard icon"
                        width={24}
                        height={24}
                    />
                )}
            </button>
        </div>
    );
};

export default ClipboardCopy;
